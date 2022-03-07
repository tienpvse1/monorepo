import { InboxOutlined } from '@ant-design/icons';
import { ISchedule } from '@modules/schedule/entity/schedule.entity';
import { Alert, Drawer } from 'antd';
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
        data.map((item) => (
          <Alert
            key={item.id}
            showIcon
            message={item.summary}
            type='info'
            style={{
              marginTop: 20,
            }}
            description={
              <>
                <span>
                  'Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fuga, earum.'
                </span>
                <br />
                <span>
                  {moment(new Date(item.dueDate)).hour()}:
                  {moment(new Date(item.dueDate)).minute()}
                </span>
              </>
            }
          />
        ))
      ) : (
        <InboxOutlined />
      )}
    </Drawer>
  );
};
