import { CoffeeOutlined, FileTextOutlined, MailOutlined, PhoneOutlined, PushpinOutlined } from '@ant-design/icons';
import { ISchedule } from '@modules/schedule/entity/schedule.entity';
import { Alert, Drawer, Empty } from 'antd';
import moment from 'moment';

interface ScheduleDrawerProps {
  data: ISchedule[];
  isVisible: boolean;
  toggle: (value: boolean) => void;
}

export const ScheduleDrawer: React.FC<ScheduleDrawerProps> = ({
  data,
  isVisible,
  toggle,
}) => {
  return (
    <Drawer
      title='Upcoming activities'
      visible={isVisible}
      onClose={() => toggle(false)}
    >
      {data.length > 0 ? (
        data.map((schedule) => (
          <Alert
            key={schedule.id}
            style={{
              marginTop: 15,
            }}
            message={
              <span style={{ fontSize: '17px' }}>
                {schedule.type.toUpperCase()}
              </span>
            }
            description={
              <>
                <span style={{ fontSize: '16px' }}>
                  {schedule.summary}
                </span> <br />
                <span style={{ fontSize: '12px', float: 'right' }}>
                  Due {moment(new Date(schedule.dueDate)).fromNow()}
                </span>
              </>
            }
            type={
              schedule.type == 'todo' && 'info' ||
              schedule.type == 'email' && 'error' ||
              schedule.type == 'meeting' && 'warning' || 'success'
            }
            showIcon
            icon={
              schedule.type == 'todo' && <FileTextOutlined /> ||
              schedule.type == 'email' && <MailOutlined /> ||
              schedule.type == 'meeting' && <CoffeeOutlined /> ||
              schedule.type == 'call' && <PhoneOutlined /> || <PushpinOutlined />
            }
          />
        ))
      ) : (
        <Empty style={{ paddingTop: '125px' }} />
      )}
    </Drawer>
  );
};
