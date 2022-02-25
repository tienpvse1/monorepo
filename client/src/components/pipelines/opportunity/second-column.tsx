import { getPipeline } from '@db/pipeline.db';
import { useGetStagesByPipelineId } from '@modules/pipeline-column/query/pipeline.get';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { qualifyStage } from '@util/stage';
import { Alert, Button, Card, Steps, Tabs } from 'antd';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { ContactInfo } from './contact-info';

interface SecondColumnProps {
  data: IPipelineItem;
}
const { Step } = Steps;
const { TabPane } = Tabs;
export const SecondColumn: React.FC<SecondColumnProps> = ({ data }) => {
  const pipeline = useLiveQuery(getPipeline);
  const { data: pipelineColumns } = useGetStagesByPipelineId(pipeline?.id);
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
