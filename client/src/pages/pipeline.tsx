import { PageTitlePipeline } from '@components/pipelines/page-title';
import { ShadowColumnCreate } from '@components/pipelines/pipeline-column/shadow-column-create';
import { ScrollBarHorizontal } from '@components/pipelines/scrollbar/scrollbar-horizontal';
import { useHandleDnD } from '@hooks/useHandleDnD';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { useGetPipeLineUser } from '@modules/pipeline/query/pipeline.get';
import { sortPipeline } from '@util/sort';
import { FC } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { PipeLineColumn } from '../components/pipelines/column';

const Pipeline: FC = () => {
  const { data } = useGetPipeLineUser();
  const {
    pipeline,
    handleMoveColumn,
    handleMoveItemColumn,
    handleMoveItemsBetweenColumns
  } = useHandleDnD(data);

  if (data !== undefined) {
    sortPipeline(data);
  };

  const pipeLineDataApi: any =
  {
    id: "5ff9dc1f-23e7-44cc-b609-6f28415f8f7d",
    createdAt: "2022-02-16T10:37:18.722Z",
    updatedAt: "2022-02-16T10:37:18.722Z",
    deletedAt: null,
    name: "tienpvse's pipeline",
    pipelineColumns: [
      {
        id: "0223038c-67ef-4927-b247-e5fbef859d39",
        createdAt: "2022-02-16T10:37:53.684Z",
        updatedAt: "2022-02-16T10:37:53.684Z",
        deletedAt: null,
        name: "third column",
        index: 3,
        pipelineItems: []
      },
      {
        id: "2663dc1a-5267-4173-bd85-c52e9763cec3",
        createdAt: "2022-02-16T10:38:07.195Z",
        updatedAt: "2022-02-16T10:38:07.195Z",
        deletedAt: null,
        name: "forth column",
        index: 4,
        pipelineItems: []
      },
      {
        id: "3aa7f328-1f2b-439d-af2d-fc732827abae",
        createdAt: "2022-02-16T10:37:44.997Z",
        updatedAt: "2022-02-16T10:37:44.997Z",
        deletedAt: null,
        name: "second column",
        index: 2,
        pipelineItems: []
      },
      {
        id: "7d3568b8-9598-479d-b069-71c1631afd54",
        createdAt: "2022-02-16T10:37:34.756Z",
        updatedAt: "2022-02-16T10:37:34.756Z",
        deletedAt: null,
        name: "first column",
        index: 1,
        pipelineItems: [
          {
            id: "5b306679-0a35-42d1-9996-59f616e6b788",
            createdAt: "2022-02-16T10:41:06.499Z",
            updatedAt: "2022-02-16T10:41:06.499Z",
            deletedAt: null,
            name: "item 1 - 6",
            index: 6
          },
          {
            id: "5ebee8b2-24bc-455b-ae33-e14a3b63c118",
            createdAt: "2022-02-16T10:38:25.420Z",
            updatedAt: "2022-02-16T10:38:25.420Z",
            deletedAt: null,
            name: "item 1 - 1",
            index: 1
          },
          {
            id: "78f2d4e6-51f4-4dd3-8d4e-f0fc8ba7bd06",
            createdAt: "2022-02-16T10:40:39.141Z",
            updatedAt: "2022-02-16T10:40:39.141Z",
            deletedAt: null,
            name: "item 1 - 7",
            index: 7
          },
          {
            id: "b0b9e7bf-e82c-4ad1-9f5c-72a8b101c190",
            createdAt: "2022-02-16T10:40:51.954Z",
            updatedAt: "2022-02-16T10:42:15.000Z",
            deletedAt: null,
            name: "item 1 - 5",
            index: 5
          },
          {
            id: "bcfd9caa-529d-4541-b088-a3a44b53789a",
            createdAt: "2022-02-16T10:38:56.188Z",
            updatedAt: "2022-02-16T10:39:59.000Z",
            deletedAt: null,
            name: "item 1 - 2",
            index: 2
          },
          {
            id: "f4a71c55-f0cc-4db6-9701-3f77a93f0457",
            createdAt: "2022-02-16T10:39:12.530Z",
            updatedAt: "2022-02-16T10:39:12.530Z",
            deletedAt: null,
            name: "item 1 - 3",
            index: 3
          }
        ]
      }
    ]
  };

  const totalColumn = data?.pipelineColumns.length || 1;
  // const totalColumn = pipeLineDataApi?.pipelineColumns.length || 1;
  const widthOfItem = 333;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    //nếu ko có vị trí điểm đến -> return
    if (!destination) return;

    const startIndex = source.index;
    const finishIndex = destination.index;
    const startColumnName = source.droppableId;
    const finishColumnName = destination.droppableId;

    //nếu kéo thả ở 1 vị trí -> return tránh xử lý code bên dưới
    if (finishColumnName === startColumnName && finishIndex === startIndex)
      return;

    //Xử lý cho kéo thả cột
    if (result.type == 'column') {
      handleMoveColumn(startIndex, finishIndex);
      console.log("start-end:", `${startIndex}-${finishIndex}`);
      
      console.log('newnew:', pipeline);

    }

    //Xử lý cho kéo thả item
    if (result.type == 'task') {
      //di chuyển các card item trong 1 column
      if (startColumnName === finishColumnName) {
        handleMoveItemColumn(startIndex, finishIndex, startColumnName);
        return;
      }

      //di chuyển các item qua lại nhiều cột
      handleMoveItemsBetweenColumns(
        startIndex,
        finishIndex,
        startColumnName,
        finishColumnName
      );
    }
  };

  return (
    <>
      <PageTitlePipeline />
      <ScrollBarHorizontal>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId='all-columns'
            direction='horizontal'
            type='column'
          >
            {(providedColumns) => (
              <>
                <div
                  className='wrapper-droppable-columns'
                  style={{ width: `${widthOfItem * totalColumn}px` }}
                  {...providedColumns.droppableProps}
                  ref={providedColumns.innerRef}
                >
                  {data?.pipelineColumns.map(
                    (pipelineColumn: IPipelineColumn) => (
                      <PipeLineColumn
                        index={pipelineColumn.index}
                        key={pipelineColumn.id}
                        pipelineColumn={pipelineColumn}
                      />
                    )
                  )}
                  {providedColumns.placeholder}
                  <ShadowColumnCreate pipelineId={data?.id} currentIndexColumn={data?.pipelineColumns.length} />
                </div>
              </>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollBarHorizontal>
    </>
  );
};

export default Pipeline;
