import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Tabs } from 'antd'
import { ContactInfo } from './contact-info';
import { OpportunityDetails } from '@components/opportunity/opportunity-details';
import { OpportunityNotes } from './opportunity-notes';
import { ListSchedules } from './list-schedules';
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
          key='1'
        >
          <OpportunityDetails data={data} />
        </TabPane>
        <TabPane
          tab='Contact Info'
          key='2'
          style={{
            height: '60vh',
            overflowY: 'scroll',
          }}
        >
          <ContactInfo data={data} />
        </TabPane>
        {/* //TODO: these tab is still hard coded */}
        <TabPane
          tab={
            <div className="my-badge">
              Task
              <sup
                style={
                  {
                    display: data.schedules.length == 0 ||
                      data.isLose || data.pipelineColumn.isWon ? 'none' : ''
                  }
                }
                className="my-badge-dot"
              >
              </sup>
            </div>
          }
          key='3'>
          <ListSchedules opportunityId={data.id} schedule={data.schedules} />
        </TabPane>
        <TabPane tab='Notes' key='4'>
          <OpportunityNotes data={data.contact} />
        </TabPane>
      </Tabs>
    </>
  )
}
