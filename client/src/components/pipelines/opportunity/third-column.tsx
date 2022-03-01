import { ClockCircleTwoTone } from '@ant-design/icons';
import { Card, Divider, Timeline, Tooltip } from 'antd';

interface ThirdColumnProps {}

export const ThirdColumn: React.FC<ThirdColumnProps> = ({}) => {
  return (
    <div>
      <Card title='History logs' style={{ width: '20vw' }}>
        <Timeline mode='left'>
          <Timeline.Item label='8:20PM'>Create a services site</Timeline.Item>
          <Timeline.Item label='7:40PM'>
            Solve initial network problems
          </Timeline.Item>
          <Timeline.Item
            dot={
              <Tooltip title='2:20PM 24-02-2022'>
                <ClockCircleTwoTone />
              </Tooltip>
            }
            label='2:20PM'
          >
            Schedule an activity
          </Timeline.Item>
          <Timeline.Item label='12:130PM'>Send an email</Timeline.Item>
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
