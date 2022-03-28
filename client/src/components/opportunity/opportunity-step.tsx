import { useStages } from '@modules/pipeline-column/query/pipeline-column.get';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useChangeStage } from '@modules/pipeline-items/mutation/pipeline-items.update';
import { GET_PIPELINE_ITEM_BY_ID } from '@modules/pipeline-items/query/pipeline-item.get';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { qualifyStage } from '@util/stage';
import { Form, Steps } from 'antd';
import { client } from '../../App';
import { CreateModal } from '@components/modal/create-modal';
import { VerificationForm } from '@components/accountant/verification-form';
import { useToggle } from '@hooks/useToggle';
import { startFireworks } from '@util/firework';
import { useState } from 'react';
const { Step } = Steps;

interface OpportunityStepProps {
  data: IPipelineItem;
}
export const OpportunityStep: React.FC<OpportunityStepProps> = ({ data }) => {
  const { data: pipelineColumns } = useStages();

  const handleDisableAfterWon = () => {
    let result: boolean = false;
    pipelineColumns.forEach((value) => {
      if (value.isWon)
        result = value.pipelineItems.some((value) => value.id === data.id);
    })

    if (data.isLose)
      result = true;

    return result;
  }

  const [disabled, setDisabled] = useState<boolean>(handleDisableAfterWon());

  const { mutate } = useChangeStage();
  const [form] = Form.useForm<any>();
  const [isVisible, toggleModalChangeStageWon] = useToggle();

  const handleUpdateStage = (currentStageId: string, newStageId: string, callback?: () => void) => {
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
          callback();
        },
      }
    );
  };

  const handleChangeStageWon = async () => {
    const record = await form.validateFields();
    console.log("Form confirm: ", record);
    handleUpdateStage(record.oldStageId, record.newStageId, () => {
      toggleModalChangeStageWon();
      startFireworks();
      setDisabled(true);
    });
  }

  const handleToggleModalChangeStageWon = (currentStageId: string, newStageId: string) => {
    form.setFieldsValue({
      oldStageId: currentStageId,
      newStageId,
      draggableId: data.id
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
            disabled={disabled}
            key={column.id}
            status={qualifyStage(index, data.pipelineColumn.index)}
            title={column.name}
            onStepClick={(step) => {
              const { id: currentId, index: currentIndex } =
                data.pipelineColumn;
              if (step !== currentIndex && column.isWon) {
                handleToggleModalChangeStageWon(currentId, pipelineColumns[step].id);
                return;
              }

              if (step !== currentIndex)
                handleUpdateStage(currentId, pipelineColumns[step].id);
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
          <VerificationForm />
        </Form>
      </CreateModal>
    </>
  );
};
