import { PlusOutlined, FileTextOutlined, CheckOutlined, MailOutlined, CoffeeOutlined } from "@ant-design/icons"
import { useScheduleContext } from "@context/schedule.context";
import { Alert, Button } from "antd"
import { useClickOutside } from '@mantine/hooks';

interface PlannedProps {
  toggleDropdown: () => void;
  isVisibleDropdown: boolean;
}

export const Planned: React.FC<PlannedProps> = ({ toggleDropdown, isVisibleDropdown }) => {

  const { toggleModal } = useScheduleContext();

  const ref = useClickOutside(() => {
    if (isVisibleDropdown == true)
      toggleDropdown();
  });

  const handleCreateSchedule = () => {
    toggleDropdown();
    toggleModal();
  }

  return (
    <div ref={ref} className="planned-container">
      <div className="planned-title">
        Planned
      </div>

      <div className="planned-list">
        <Alert
          className="planned-items"
          message="To Do"
          description={<>Due in 1 days</>}
          type="info"
          showIcon
          icon={<FileTextOutlined />}
          closable
          closeIcon={
            <CheckOutlined style={{ fontSize: '14px' }} />
          }
        />
        <Alert
          className="planned-items"
          message="Email"
          description={<>Due in 7 days</>}
          type="error"
          showIcon
          icon={<MailOutlined />}
          closable
          closeIcon={
            <CheckOutlined style={{ fontSize: '14px' }} />
          }
        />
        <Alert
          className="planned-items"
          message="Meeting"
          description={<>Due in 16 hours</>}
          type="warning"
          showIcon
          icon={<CoffeeOutlined />}
          closable
          closeIcon={
            <CheckOutlined style={{ fontSize: '14px' }} />
          }
        />
      </div>

      <Button onClick={handleCreateSchedule} icon={<PlusOutlined />} className="btn-schedule" >
        Schedule An Activity
      </Button>
    </div>
  )
}