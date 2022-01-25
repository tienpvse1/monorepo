import { PageTitlePipeline } from '@components/pipelines/page-title';
import { ScrollBarHorizontal } from '@components/pipelines/scrollbar/scrollbar-horizontal';
import { useHandleDnD } from '@hooks/useHandleDnD';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { FC } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { PipeLineColumn } from '../components/pipelines/column';

export const Pipeline: FC = () => {

  // const { data } = useGetPipeLineUser();
  // console.log('fetch-data:', data?.length);

  const pipeLineDataApi: IPipeline[] = [
    {
      id: '',
      createdAt: null!,
      deletedAt: null!,
      updatedAt: null!,
      name: "Pipeline Default",
      account: null!,
      pipelineColumns: [
        {
          id: '',
          createdAt: null!,
          deletedAt: null!,
          updatedAt: null!,
          name: "todo",
          pipeline: "string",
          pipelineItems: [
            {
              id: "t1",
              name: "my todo 1",
              createdAt: null!,
              deletedAt: null!,
              updatedAt: null!,
              pipelineColumn: null!
            }
          ]
        },
        {
          id: '',
          createdAt: null!,
          deletedAt: null!,
          updatedAt: null!,
          name: "inProgress",
          pipeline: "string",
          pipelineItems: []
        },
        {
          id: '',
          createdAt: null!,
          deletedAt: null!,
          updatedAt: null!,
          name: "report",
          pipeline: "string",
          pipelineItems: []
        }
      ]
    }
  ]

  const totalColumn = pipeLineDataApi[0].pipelineColumns.length || 1;
  const widthOfItem = 333;

  const {
    pipeline,
    handleMoveColumn,
    handleMoveItemColumn,
    handleMoveItemsBetweenColumns } = useHandleDnD(pipeLineDataApi)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    //nếu ko có vị trí điểm đến -> return
    if (!destination) return;

    const startIndex = source.index;
    const finishIndex = destination.index;
    const startColumnName = source.droppableId;
    const finishColumnName = destination.droppableId;

    //nếu kéo thả ở 1 vị trí -> return tránh xử lý code bên dưới
    if (
      finishColumnName === startColumnName &&
      finishIndex === startIndex
    ) return;

    //Xử lý cho kéo thả cột
    if (result.type == 'column') {
      handleMoveColumn(startIndex, finishIndex);
    }

    //Xử lý cho kéo thả item
    if (result.type == 'task') {
      //di chuyển các card item trong 1 column
      if (startColumnName === finishColumnName) {
        handleMoveItemColumn(startIndex, finishIndex, startColumnName);
        return;
      }

      //di chuyển các item qua lại nhiều cột
      handleMoveItemsBetweenColumns(startIndex, finishIndex, startColumnName, finishColumnName);
    }
  }

  return (
    <>
      <PageTitlePipeline />
      <ScrollBarHorizontal>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(providedColumns) => (
              <div
                className='wrapper-droppable-columns'
                style={{ width: `${widthOfItem * totalColumn}px` }}
                {...providedColumns.droppableProps}
                ref={providedColumns.innerRef}
              >
                {pipeline[0].pipelineColumns.map((pipeline: IPipelineColumn, index: number) =>
                  <PipeLineColumn index={index} key={pipeline.name} pipelineColumn={pipeline} />)
                }
                {providedColumns.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollBarHorizontal>
    </>
  )
}
