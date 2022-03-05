import { ClockCircleTwoTone } from '@ant-design/icons';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useHistory } from '@modules/history/query/history.get';
import { getHistoryDate } from '@util/date';
import { Card, Divider, Timeline, Tooltip } from 'antd';
import { useCookies } from 'react-cookie';

interface ThirdColumnProps {}

export const ThirdColumn: React.FC<ThirdColumnProps> = ({}) => {
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const { data } = useHistory(public_user_info.id);
  console.log(data);
  return (
    <div>
      <Card title='History logs' style={{ width: '20vw' }}>
        <Timeline mode='left'>
          {data.map((item) => (
            <Timeline.Item
              key={item.id}
              label={`${getHistoryDate(item.createdAt)}`}
            >
              {item.name}
            </Timeline.Item>
          ))}
        </Timeline>
        <Divider plain orientation='center'>
          Today
        </Divider>
        <Timeline mode='left'>
          <Timeline.Item label='6:45PM'>
            CRM BOT: activated account
          </Timeline.Item>
        </Timeline>
      </Card>
    </div>
  );
};
