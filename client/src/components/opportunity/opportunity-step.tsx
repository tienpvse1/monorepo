import { useStages } from '@modules/pipeline-column/query/pipeline-column.get';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useChangeStage } from '@modules/pipeline-items/mutation/pipeline-items.update';
import { GET_PIPELINE_ITEM_BY_ID } from '@modules/pipeline-items/query/pipeline-item.get';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { qualifyStage } from '@util/stage';
import { Col, Form, Row, Steps } from 'antd';
import { client } from '../../App';
import { CreateModal } from '@components/modal/create-modal';
import { VerificationForm } from '@components/sale/verification-form';
import { useToggle } from '@hooks/useToggle';
import { startFireworks } from '@util/firework';
import { usePostOpportunityHistory } from '@modules/opportunity-history/mutation/opportunity-history.post';
import { OpportunityHistoryType } from '@modules/opportunity-history/entity/opportunity-history.entity';
import { QUERY_OPPORTUNITY_HISTORY } from '@modules/opportunity-history/query/opportunity-history.get';
import { UploadInvoice } from '@components/sale/upload-invoice';
import { useCreateReason } from '@modules/reason/mutation/reason.post';
const { Step } = Steps;

interface OpportunityStepProps {
  data: IPipelineItem;
}
export const OpportunityStep: React.FC<OpportunityStepProps> = ({ data }) => {
  const { data: pipelineColumns } = useStages();

  const { mutate } = useChangeStage();
  const [form] = Form.useForm<any>();
  const [isVisible, toggleModalChangeStageWon] = useToggle();
  const { mutateAsync: mutateOpportunityHistory } = usePostOpportunityHistory();
  const { mutate: postReason } = useCreateReason();

  const handleUpdateStage = (
    currentStageId: string,
    newStageId: string,
    startColumnName?: string,
    finishColumnName?: string,
    callback?: () => void
  ) => {
    mutate(
      {
        id: data.id,
        newStageId,
        oldStageId: currentStageId,
      },
      {
        onSuccess: () => {
          client.refetchQueries(GET_PIPELINE_ITEM_BY_ID);
          client.refetchQueries(GET_PIPELINE_DESIGN);
          mutateOpportunityHistory({
            newStageID: newStageId,
            oldStageId: currentStageId,
            description: `moved from ${startColumnName} to ${finishColumnName}`,
            pipelineItemId: data.id,
            type: OpportunityHistoryType.CHANGE_STATE,
          }, {
            onSuccess: () => {
              client.refetchQueries([QUERY_OPPORTUNITY_HISTORY, data.id]);
              callback ? callback() : '';
            }
          });
        },
      }
    );
  };

  const handleChangeStageWon = async () => {
    const record = await form.validateFields();
    handleUpdateStage(
      record.oldStageId,
      record.newStageId,
      record.startColumnName,
      record.finishColumnName,
      () => {
        postReason({
          pipelineItemId: data.id,
          description: record.description,
          photo: record.photo,
          invoiceId: record.invoiceId,
          reason: 'no thing',
          reasonType: 'win'
        }, {
          onSuccess: () => {
            toggleModalChangeStageWon();
            startFireworks();
          }
        })
      })
  }

  const handleToggleModalChangeStageWon = (
    currentStageId: string,
    newStageId: string,
    startColumnName: string,
    finishColumnName: string
  ) => {
    form.setFieldsValue({
      oldStageId: currentStageId,
      newStageId,
      draggableId: data.id,
      startColumnName,
      finishColumnName
    })
    toggleModalChangeStageWon();
  }
  return (
    <>
      <Steps
        type='navigation'
        current={data.pipelineColumn.index}
        className='site-navigation-steps'
      >
        {pipelineColumns?.map((column, index) => (
          <Step
            disabled={data.pipelineColumn.isWon || data.isLose && true}
            key={column.id}
            status={qualifyStage(index, data.pipelineColumn.index)}
            title={column.name}
            onStepClick={(step) => {
              const { id: currentId, index: currentIndex, name: currentName } =
                data.pipelineColumn;
              if (step !== currentIndex && column.isWon) {
                handleToggleModalChangeStageWon(currentId, pipelineColumns[step].id, currentName, pipelineColumns[step].name);
                return;
              }

              if (step !== currentIndex)
                handleUpdateStage(currentId, pipelineColumns[step].id, currentName, pipelineColumns[step].name);
            }}
          />
        ))}
      </Steps>
      <CreateModal
        title="Successful Confirmation"
        bodyStyle={{ height: '350px' }}
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
