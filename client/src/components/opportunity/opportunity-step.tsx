import { useStages } from '@modules/pipeline-column/query/pipeline.get';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useChangeStage } from '@modules/pipeline-items/mutation/pipeline-items.update';
import { GET_PIPELINE_ITEM_BY_ID } from '@modules/pipeline-items/query/pipeline-item.get';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { qualifyStage } from '@util/stage';
import { Steps } from 'antd';
import { client } from '../../App';
const { Step } = Steps;

interface OpportunityStepProps {
  data: IPipelineItem;
}
export const OpportunityStep: React.FC<OpportunityStepProps> = ({ data }) => {
  const { data: pipelineColumns } = useStages();
  const { mutate } = useChangeStage();
  const handleUpdateStage = (currentStageId: string, newStageId: string) => {
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
        },
      }
    );
  };
  return (
    <>
      <Steps
        type='navigation'
        current={data.pipelineColumn.index}
        className='site-navigation-steps'
      >
        {pipelineColumns?.map((column, index) => (
          <Step
            key={column.id}
            status={qualifyStage(index, data.pipelineColumn.index)}
            title={column.name}
            onStepClick={(step) => {
              const { id: currentId, index: currentIndex } =
                data.pipelineColumn;
              if (step !== currentIndex)
                handleUpdateStage(currentId, pipelineColumns[step].id);
            }}
          />
        ))}
      </Steps>
    </>
  );
};
