import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useHistory } from '@modules/history/query/history.get';
import { getHistoryDate } from '@util/date';
import { Divider, Tag, Timeline } from 'antd';
import { useCookies } from 'react-cookie';

interface ThirdColumnProps { }

export const OpportunityTimeLine: React.FC<ThirdColumnProps> = ({ }) => {
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const { data } = useHistory(public_user_info.id);
  
  return (
    <>
      <Timeline mode='left'>
        <div style={{ overflowY: 'auto', whiteSpace: 'nowrap', height: '518px' }}>
          {data.map((item) => (
            <Timeline.Item style={{ paddingTop: '10px' }}
              key={item.id}
            >
              {item.name}
              <Tag style={{ marginLeft: 10, borderRadius: 5 }}>
                {getHistoryDate(item.createdAt)}
              </Tag>
            </Timeline.Item>
          ))}
        </div>
      </Timeline>
      <Divider plain orientation='center'>
        Today
      </Divider>
      <Timeline mode='left'>
        <Timeline.Item>
          CRM BOT: activated account
          <Tag style={{ marginLeft: 10, borderRadius: 5 }}>
            6:45PM
          </Tag>
        </Timeline.Item>
      </Timeline>
    </>
  );
};
