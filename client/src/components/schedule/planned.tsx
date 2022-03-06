import {
  CheckOutlined,
  FileTextOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useClickOutside } from '@mantine/hooks';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
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
  console.log(cardData);
  const ref = useClickOutside(() => {
    if (isDropdownVisible) toggleDropdown();
  });

  const handleCreateSchedule = () => {
    toggleDropdown();
    toggleModal();
  };
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
