import { EmptyComponent } from '@components/empty';
import { PageTitlePipeline } from '@components/pipelines/page-title';
import { PipeLineColumn } from '@components/pipelines/pipeline-column';
import { ScrollBarHorizontal } from '@components/pipelines/scrollbar/scrollbar-horizontal';
import { useToggle } from '@hooks/useToggle';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { Button, Col, Form, message, Row } from 'antd';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { CreateColumnModal } from './pipeline-column/create-column-modal';
import { CreateModal } from '@components/modal/create-modal';
import { VerificationForm } from '@components/sale/verification-form';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useCookies } from 'react-cookie';
import { useChangeStage } from '@modules/pipeline-items/mutation/pipeline-items.update';
import { useQueryClient } from 'react-query';
import { getPipelineItemById, GET_PIPELINE_ITEM_BY_ID } from '@modules/pipeline-items/query/pipeline-item.get';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { startFireworks } from '@util/firework';
import { UploadInvoice } from '@components/sale/upload-invoice';
import { useCreateReason } from '@modules/reason/mutation/reason.post';
import { usePostOpportunityHistory } from '@modules/opportunity-history/mutation/opportunity-history.post';
import { OpportunityHistoryType } from '@modules/opportunity-history/entity/opportunity-history.entity';
import { useSendEmail } from '@modules/email/mutate/email.post';
import numberSeparator from "number-separator";

interface MainPipelineProps {
  data: IPipeline;
  newPipeLine: IPipeline,
  handleMoveColumn: (startIndex: number, finishIndex: number) => void,
  handleMoveItemColumn: (startIndex: number, finishIndex: number, columnName: string) => void,
  handleMoveItemsBetweenColumns: (startIndex: number,
    finishIndex: number,
    startColumn: string,
    finishColumn: string,
    draggableId: string) => void,
}

export const MainPipeline: React.FC<MainPipelineProps> = ({
  data,
  newPipeLine,
  handleMoveColumn,
  handleMoveItemColumn,
  handleMoveItemsBetweenColumns
}) => {
  const [form] = Form.useForm<any>();
  const [visible, setModalCreateStage] = useToggle();
  const [isVisible, toggleModalChangeStageWon] = useToggle();
  const { mutateAsync: mutateOpportunityHistory } = usePostOpportunityHistory();

  const queryClient = useQueryClient();
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const { mutate: changeStageWon } = useChangeStage();
  const { mutate: postReason } = useCreateReason();

  const stageWon = data?.pipelineColumns?.find((stage) => stage.isWon === true)
  const totalColumn = data?.pipelineColumns.length || 1;
  const widthOfItem = 333;

  const handleIsRoleAdmin = () => {
    return public_user_info.role.name === 'admin' ? true : false
  }
  const onError = () => {
    message.error('Can not send email');
  }
  const { mutate: sendEmail } = useSendEmail(onError);

  const handleChangeStageWon = async () => {
    const {
      draggableId,
      newStageId,
      oldStageId,
      description,
      photo,
      startColumnName,
      finishColumnName
    } = await form.validateFields();

    postReason({
      pipelineItemId: draggableId,
      description: description,
      photo,
      invoiceId: '',
      reason: 'no thing',
      reasonType: 'win'
    }, {
      onSuccess: () => {
        changeStageWon({
          id: draggableId,
          newStageId: newStageId,
          oldStageId: oldStageId,
        }, {
          onSuccess: () => {
            mutateOpportunityHistory({
              newStageID: newStageId,
              oldStageId: oldStageId,
              description: `moved from ${startColumnName} to ${finishColumnName}`,
              pipelineItemId: draggableId,
              type: OpportunityHistoryType.CHANGE_STATE,
            }, {
              onSuccess: () => {
                queryClient.invalidateQueries(GET_PIPELINE_ITEM_BY_ID);
                queryClient.invalidateQueries(GET_PIPELINE_DESIGN);
                toggleModalChangeStageWon();
                startFireworks();
                form.resetFields();
                getPipelineItemById(draggableId).then((data) => {
                  sendEmail({
                    subject: 'VJAA CRM - Thank You For Your Purchase !',
                    to: [{ email: data.contact.email, isTag: false }],
                    value: `
                    <div class="invoice-box" style="
                        max-width: 800px;
                        margin: auto;
                        padding: 30px;
                        padding-top: 0px;
                        border: 1px solid #eee; 
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                        font-size: 16px;
                        line-height: 24px;
                        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                        color: #555;
		                ">
                          <h1>Thank you for your purchase
                          <svg width="60" height="60" viewBox="5 -2 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
                              fill="#78b13f"
                          />
                          </svg>
                          </h1>

                            <table style="
                              width: 100%;
                              line-height: inherit;
                              text-align: left;
                              border-collapse: collapse;
                            ">
                                <tr class="information">
                                    <td colspan="2" style="padding: 5px; vertical-align: top; padding-bottom: 40px;">
                                        <table style="
                                        width: 100%;
                                        line-height: inherit;
                                        text-align: left;
                                        border-collapse: collapse;
                                      ">
                                            <tr>
                                                <td>
                                                    Company name: ${data.contact.company.name} <br /> Email company: ${data.contact.company.email} <br /> City: ${data.contact.company.city.admin_name}
                                                </td>

                                                <td>
                                                    Contact name: ${data.contact.name} <br /> Email contact: ${data.contact.email} <br /> Phone: ${data.contact.phone}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr class="heading" style=" background: #eee;
                                border-bottom: 1px solid #ddd;
                                font-weight: bold;">
                                    <td style="padding: 5px; vertical-align: top; text-align: left;">Item</td>
                                    <td style="padding: 5px; vertical-align: top; text-align: center;">Quantity</td>
                                    <td style="padding: 5px; vertical-align: top; text-align: center; width: 14%;">Discount (%)</td>
                                    <td style="padding: 5px; vertical-align: top; text-align: right;">Price</td>
                                </tr>

                                <tr class="item" style="border-bottom: 1px solid #eee;">
                                    <td style="padding: 5px; vertical-align: top; text-align: left; width: 50%;">${data.opportunityRevenue.course.name}</td>
                                    <td style="padding: 5px; vertical-align: top; text-align: center;">${data.opportunityRevenue.quantity}</td>
                                    <td style="padding: 5px; vertical-align: top; text-align: center;">${Math.abs(data.expectedRevenue - (data.opportunityRevenue.course.price * data.opportunityRevenue.quantity)) / (data.opportunityRevenue.course.price * data.opportunityRevenue.quantity) * 100}%</td>
                                    <td style="padding: 5px; vertical-align: top; text-align: right;">${numberSeparator(data.opportunityRevenue.course.price, '.')}vnd</td>
                                </tr>

                                <tr class="total" style=" border-top: 2px solid #eee;
                                font-weight: bold;">
                                    <td style="padding: 5px; vertical-align: top;"></td>
                                    <td style="padding: 5px; vertical-align: top;"></td>
                                    <td style="padding: 5px; vertical-align: top;"></td>
                                    <td style="padding: 5px; vertical-align: top; text-align: right;">Total: ${numberSeparator(data.expectedRevenue, '.')}vnd</td>
                                </tr>
                            </table>
                    </div>
                    `
                  })
                })
              }
            });
          }
        })
      }
    })
  }

  const handleToggleModalChangeStageWon = (
    oldStageId: string,
    newStageId: string,
    draggableId: string,
    finishColumnName: string
  ) => {
    form.setFieldsValue({
      oldStageId,
      newStageId,
      draggableId,
      finishColumnName,
      startColumnName: newPipeLine.pipelineColumns.find((column) => column.id === oldStageId).name
    })
    toggleModalChangeStageWon();
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    //nếu ko có vị trí điểm đến -> return
    if (!destination) return;

    const startIndex = source.index;
    const finishIndex = destination.index;
    const startColumn = source.droppableId;
    const finishColumn = destination.droppableId;

    //nếu kéo thả ở 1 vị trí -> return tránh xử lý code bên dưới
    if (finishColumn === startColumn && finishIndex === startIndex) return;

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

      if (finishColumn === stageWon?.id) {
        handleToggleModalChangeStageWon(startColumn, stageWon.id, draggableId, stageWon.name);
        return;
      }

      //di chuyển các item qua lại nhiều cột
      handleMoveItemsBetweenColumns(
        startIndex,
        finishIndex,
        startColumn,
        finishColumn,
        draggableId
      );
    }
  };

  return (
    <>
      <PageTitlePipeline
        isRoleAdmin={handleIsRoleAdmin()}
        setModalCreateStage={setModalCreateStage}
        pipeline={data}
      />
      {data?.pipelineColumns.length == 0 ? (
        <EmptyComponent
          imageStyle={{ height: 200 }}
          description={<span>Stages have not been created.</span>}
        ></EmptyComponent>
      ) : (
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
                    {handleIsRoleAdmin() &&
                      <div className='shadow-column-create'>
                        <Button
                          onClick={setModalCreateStage}
                          style={{
                            width: '300px',
                            height: '80px',
                            fontSize: '15px',
                          }}
                          type='dashed'
                        >
                          Add a stage column
                        </Button>
                      </div>}
                  </div>
                </>
              )}
            </Droppable>
          </DragDropContext>
        </ScrollBarHorizontal>
      )}
      <CreateColumnModal
        setVisible={setModalCreateStage}
        visible={visible}
        pipelineId={data?.id}
        hasStageWon={data?.pipelineColumns.some((value) => value.isWon)}
      />
      <CreateModal
        destroyOnClose={true}
        title="Successful Confirmation"
        bodyStyle={{ height: '260px' }}
        width={900}
        isOpenModal={isVisible}
        toggleCreateModal={toggleModalChangeStageWon}
        hasSubmitMethod={handleChangeStageWon}
        hasForm={true}
      >
        <Form
          form={form}
          layout='vertical'
        >
          <Row>
            <UploadInvoice form={form} />
            <Col style={{ padding: '20px' }} span={12}>
              <VerificationForm />
            </Col>
          </Row>
        </Form>
      </CreateModal>
    </>
  );
};
