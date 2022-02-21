import { EmptyComponent } from '@components/empty';
import { PageTitlePipeline } from '@components/pipelines/page-title';
import { ShadowColumnCreate } from '@components/pipelines/pipeline-column/shadow-column-create';
import { ScrollBarHorizontal } from '@components/pipelines/scrollbar/scrollbar-horizontal';
import { useHandleDnD } from '@hooks/useHandleDnD';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { useGetPipeLineUser } from '@modules/pipeline/query/pipeline.get';
import { sortPipeline } from '@util/sort';
import { Button } from 'antd';
import { FC, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { PipeLineColumn } from '../components/pipelines/column';

const Pipeline: FC = () => {
  const { data } = useGetPipeLineUser();
  const {
    newPipeLine,
    isError,
    setPipeLine,
    handleMoveColumn,
    handleMoveItemColumn,
    handleMoveItemsBetweenColumns
  } = useHandleDnD(data);

  useEffect(() => {
    setPipeLine(data);
  }, [data, isError])

  if (data !== undefined) { sortPipeline(data) };

  const totalColumn = data?.pipelineColumns.length || 1;
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
      {data ?
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
                    {newPipeLine?.pipelineColumns.map(
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
        </ScrollBarHorizontal> :
        <EmptyComponent
          imageStyle={{ height: 60 }}
          description={
            <span>
              Customize <a href="#API">Description</a>
            </span>}
        >
          <Button type="primary">Create Now</Button>
        </EmptyComponent>
      }

    </>
  );
};

export default Pipeline;
