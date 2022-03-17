import { OpportunityHistoryType } from '@modules/opportunity-history/entity/opportunity-history.entity';
import { useOpportunityHistory } from '@modules/opportunity-history/query/opportunity-history.get';
import { getHistoryDate } from '@util/date';
import { Divider, Tag, Timeline } from 'antd';

interface ThirdColumnProps {
  opportunityId: string;
}

export const OpportunityTimeLine: React.FC<ThirdColumnProps> = ({
  opportunityId,
}) => {
  const { data } = useOpportunityHistory(opportunityId);

  return (
    <div className='time-line-opportunity'>
      <Timeline mode='left'>
        {data?.map(
          (item) =>
            item.type === OpportunityHistoryType.CHANGE_STATE && (
              <Timeline.Item
                label={getHistoryDate(item.createdAt)}
                key={item.id}
              >
                Moved from{' '}
                <Tag color={'blue'}>
                  {item.description.split(/from|to/)[1]}
                </Tag>{' '}
                to{' '}
                <Tag color={'error'}>
                  {item.description.split(/from|to/)[2]}
                </Tag>
              </Timeline.Item>
            )
        )}
      </Timeline>
      <Divider plain orientation='center'>
        Today
      </Divider>
      <Timeline mode='left'>
        <Timeline.Item
          label={<Tag style={{ marginLeft: 10, borderRadius: 5 }}>6:45PM</Tag>}
        >
          CRM BOT: activated account
        </Timeline.Item>
      </Timeline>
    </div>
  );
};
