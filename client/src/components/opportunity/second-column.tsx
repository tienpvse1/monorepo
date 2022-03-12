import { getPipeline } from '@db/pipeline.db';
import { useStages } from '@modules/pipeline-column/query/pipeline-column.get';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useChangeStage } from '@modules/pipeline-items/mutation/pipeline-items.update';
import { GET_PIPELINE_ITEM_BY_ID } from '@modules/pipeline-items/query/pipeline-item.get';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { qualifyStage } from '@util/stage';
import { Alert, Button, Card, Steps, Tabs } from 'antd';
import { useLiveQuery } from 'dexie-react-hooks';
import { client } from '../../App';
import { ContactInfo } from './contact-info';

interface SecondColumnProps {
  data: IPipelineItem;
}
const { Step } = Steps;
const { TabPane } = Tabs;
export const SecondColumn: React.FC<SecondColumnProps> = ({ data }) => {
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
    <div>
      <Card style={{ width: '55vw' }} title='Stages'>
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
      </Card>
      <Card>
        <Tabs defaultActiveKey='1' type='line' style={{ width: '50vw' }}>
          <TabPane
            tab='CONTACT INFO'
            key='1'
            style={{
              height: '60vh',
              overflowY: 'scroll',
            }}
          >
            <ContactInfo data={data} />
          </TabPane>
          {/* //TODO: these tab is still hard coded */}
          <TabPane tab='TASK' key='2'>
            <Alert
              message='Meeting with John'
              type='error'
              closable
              description='Please make sure not to forget this'
            />
            <Alert
              message='Sending email to John'
              type='warning'
              closable
              description='Send an email to tienpvse at 9:00pm'
            />
            <Alert
              showIcon
              message='Meeting with John'
              type='success'
              closable
              description='go to store and buy coffee'
            />
          </TabPane>
          <TabPane tab='NOTES' key='3'>
            Notes
          </TabPane>
          <TabPane tab='UPCOMING ACTIVITY' key='4'>
            <Button type='primary'>Compose</Button>
          </TabPane>
          <TabPane tab='EMAIL' key='5'>
            <Button type='primary'>Compose</Button>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};
