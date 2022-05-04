import { CoffeeOutlined, FileTextOutlined, MailOutlined, PhoneOutlined, PushpinOutlined } from '@ant-design/icons';
import { ISchedule } from '@modules/schedule/entity/schedule.entity';
import { Alert, Drawer, Empty, Tag } from 'antd';
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
  console.log('schedule:', data);

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
              <>
                <span style={{ fontSize: '17px' }}>
                  {schedule.activityType.name.toUpperCase()}
                </span>
                {schedule.isDone ?
                  <Tag color={'purple'} style={{ borderRadius: '10px', float: 'right' }}>
                    Done
                  </Tag> :
                  <Tag color={'magenta'} style={{ borderRadius: '10px', float: 'right' }}>
                    Undone
                  </Tag>}
              </>
            }
            description={
              <>
                <span >{schedule.pipelineItem.name}</span> <br />
                <span style={{ fontSize: '16px' }}>
                  {schedule.summary}
                </span> <br />
                <span style={{ fontSize: '12px', float: 'right' }}>
                  Due {moment(new Date(schedule.dueDate)).fromNow()}
                </span> <br />
              </>
            }
            type={
              schedule.activityType.name == 'Todo' && 'info' ||
              schedule.activityType.name == 'Email' && 'error' ||
              schedule.activityType.name == 'Meeting' && 'warning' || 'success'
            }
            showIcon
            icon={
              schedule.activityType.name == 'Todo' && <FileTextOutlined /> ||
              schedule.activityType.name == 'Email' && <MailOutlined /> ||
              schedule.activityType.name == 'Meeting' && <CoffeeOutlined /> ||
              schedule.activityType.name == 'Call' && <PhoneOutlined /> || <PushpinOutlined />
            }
          />
        ))
      ) : (
        <Empty style={{ paddingTop: '125px' }} />
      )}
    </Drawer>
  );
};
