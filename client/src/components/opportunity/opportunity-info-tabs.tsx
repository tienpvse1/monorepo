import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Alert, Button, Tabs } from 'antd'
import { ContactInfo } from './contact-info';
const { TabPane } = Tabs;

interface OpportunityInfoTabsProps {
  data: IPipelineItem;
}

export const OpportunityInfoTabs: React.FC<OpportunityInfoTabsProps> = ({ data }) => {
  return (
    <>
      <Tabs
        size="large"
        defaultActiveKey='1'
        type='line'
      >
        <TabPane
          tab='Details'
          key='0'
        >

        </TabPane>
        <TabPane
          tab='Contact Info'
          key='1'
          style={{
            height: '60vh',
            overflowY: 'scroll',
          }}
        >
          <ContactInfo data={data} />
        </TabPane>
        {/* //TODO: these tab is still hard coded */}
        <TabPane tab='Task' key='2'>
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
        <TabPane tab='Notes' key='3'>
          Notes
        </TabPane>
        <TabPane tab='Upcoming Activity' key='4'>
          <Button type='primary'>Compose</Button>
        </TabPane>
        <TabPane tab='Email' key='5'>
          <Button type='primary'>Compose</Button>
        </TabPane>
      </Tabs>
    </>
  )
}
