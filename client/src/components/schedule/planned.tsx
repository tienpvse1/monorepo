import {
  FileTextOutlined,
  PlusOutlined,
  MailOutlined,
  CoffeeOutlined,
  PushpinOutlined,
  PhoneOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useClickOutside } from '@mantine/hooks';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useRemoveSchedule } from '@modules/schedule/mutation/schedule.delete';
import { Alert, Button } from 'antd';
import moment from 'moment';
interface PlannedProps {
  toggleDropdown: () => void;
  cardData: IPipelineItem;
  isDropdownVisible: boolean;
  toggleModal: () => void;
}
const Planned: React.FC<PlannedProps> = ({
  toggleDropdown,
  cardData,
  isDropdownVisible,
  toggleModal,
}) => {
  const ref = useClickOutside(() => {
    if (isDropdownVisible) toggleDropdown();
  });

  const handleCreateSchedule = () => {
    toggleDropdown();
    toggleModal();
  };

  const { mutate: removeSchedule } = useRemoveSchedule();

  return (
    <div ref={ref} className='planned-container'>
      <div className='planned-title'>Planned</div>

      <div className='planned-list'>
        {cardData.schedules.map((schedule) => (
          <Alert
            key={schedule.id}
            className='planned-items'
            message={schedule.summary}
            description={
              <>Due {moment(new Date(schedule.dueDate)).fromNow()}</>
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
            closable
            closeIcon={
              <CheckCircleOutlined
                onClick={() => removeSchedule(schedule.id)}
                className="close-icon"
              />
            }
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
