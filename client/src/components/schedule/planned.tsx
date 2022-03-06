import {
  CheckOutlined,
  FileTextOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { CreateModal } from '@components/modal/create-modal';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useBooleanToggle, useClickOutside } from '@mantine/hooks';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useSchedules } from '@modules/schedule/query/schedule.get';
import { Alert, Button } from 'antd';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import { CreateScheduleForm } from './create-schedule-form';
interface PlannedProps {
  toggleDropdown: () => void;
  cardData: IPipelineItem;
}
const Planned: React.FC<PlannedProps> = ({ toggleDropdown, cardData }) => {
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const { data } = useSchedules(public_user_info.id, cardData.id);
  const [value, toggle] = useBooleanToggle(false);
  const ref = useClickOutside(() => {
    if (value == true) toggle(false);
  });

  const handleCreateSchedule = () => {
    toggleDropdown();
    toggle();
  };
  return (
    <div ref={ref} className='planned-container'>
      <CreateModal
        width={500}
        title='Schedule Activity'
        isOpenModal={value}
        toggleCreateModal={() => toggle(false)}
        callback={(record) => console.log(record)}
      >
        <CreateScheduleForm />
      </CreateModal>
      <div className='planned-title'>Planned</div>

      <div className='planned-list'>
        {data.map((schedule) => (
          <Alert
            key={schedule.id}
            className='planned-items'
            message={schedule.summary}
            description={
              <>Due {moment(new Date(schedule.dueDate)).fromNow()}</>
            }
            type='info'
            showIcon
            icon={<FileTextOutlined />}
            closable
            closeIcon={<CheckOutlined style={{ fontSize: '14px' }} />}
          />
        ))}
      </div>

      <Button
        onClick={handleCreateSchedule}
        icon={<PlusOutlined />}
        className='btn-schedule'
      >
        Schedule An Activity
      </Button>
    </div>
  );
};

export default Planned;
