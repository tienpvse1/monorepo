import { EmptyComponent } from '@components/empty';
import { CreateModal } from '@components/modal/modal-create';
import { PageTitlePipeline } from '@components/pipelines/page-title';
import { ModalColumnCreate } from '@components/pipelines/pipeline-column/modal-column-create';
import { ScrollBarHorizontal } from '@components/pipelines/scrollbar/scrollbar-horizontal';
import { useHandleDnD } from '@hooks/useHandleDnD';
import { useToggle } from '@hooks/useToggle';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { useGetPipeLineUser } from '@modules/pipeline/query/pipeline.get';
import { sortPipeline } from '@util/sort';
import { Button } from 'antd';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { PipeLineColumn } from '@components/pipelines/column';
import { CreateFormSchedule } from '@components/schedule/create-form-schedule';
import { useScheduleContext } from '@context/schedule.context';

interface MainPipelineProps {

}

export const MainPipeline: React.FC<MainPipelineProps> = ({ }) => {
  const [visible, setModalCreateStage] = useToggle();
  const { isOpenModal, toggleModal } = useScheduleContext();

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
    const { source, destination, draggableId } = result;
    //nếu ko có vị trí điểm đến -> return
    if (!destination) return;

    const startIndex = source.index;
    const finishIndex = destination.index;
    const startColumn = source.droppableId;
    const finishColumn = destination.droppableId;

    //nếu kéo thả ở 1 vị trí -> return tránh xử lý code bên dưới
    if (finishColumn === startColumn && finishIndex === startIndex)
      return;

    //Xử lý cho kéo thả cột
    if (result.type == 'column') {
      handleMoveColumn(startIndex, finishIndex);
    }

    //Xử lý cho kéo thả item
    if (result.type == 'task') {
      //di chuyển các card item trong 1 column      
      if (startColumn === finishColumn) {
        handleMoveItemColumn(startIndex, finishIndex, startColumn);
        return;
      }

      //di chuyển các item qua lại nhiều cột
      handleMoveItemsBetweenColumns(startIndex, finishIndex, startColumn, finishColumn, draggableId);

    }
  };

  return (
    <>
      <PageTitlePipeline setModalCreateStage={setModalCreateStage} />
      {data?.pipelineColumns.length == 0 ?
        <EmptyComponent
          imageStyle={{ height: 200 }}
          description={
            <span>
              Stages have not been created.
            </span>}
        >
        </EmptyComponent> :
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
                    <div className="shadow-column-create">
                      <Button
                        onClick={setModalCreateStage}
                        style={{ width: '300px', height: '80px', fontSize: '15px' }}
                        type="dashed"
                      >
                        Add a stage column
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Droppable>
          </DragDropContext>
        </ScrollBarHorizontal>
      }
      <ModalColumnCreate
        setVisible={setModalCreateStage}
        visible={visible}
        pipelineId={data?.id}
      />

      <CreateModal
        width={500}
        title="Schedule Activity"
        isOpenModal={isOpenModal}
        toggleCreateModal={toggleModal}
        callback={() => { }}
      >
        <CreateFormSchedule />
      </CreateModal>
    </>
  )
};

