import { PlusOutlined, FileTextOutlined, CheckOutlined, MailOutlined, CoffeeOutlined } from "@ant-design/icons"
import { useScheduleContext } from "@context/schedule.context";
import { Alert, Button } from "antd"

interface PlannedProps {
  toggleDropdown: () => void;
}

export const Planned: React.FC<PlannedProps> = ({ toggleDropdown }) => {

  const { toggleModal } = useScheduleContext();

  const handleCreateSchedule = () => {
    toggleDropdown();
    toggleModal();
  }

  return (
    <div className="planned-container">
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
            <Button shape="round" size="small" type="ghost">
              <CheckOutlined />
            </Button>
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
            <Button shape="round" size="small" type="ghost">
              <CheckOutlined />
            </Button>
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
            <Button shape="round" size="small" type="ghost">
              <CheckOutlined />
            </Button>
          }
        />
      </div>

      <Button onClick={handleCreateSchedule} icon={<PlusOutlined />} className="btn-schedule" >
        Schedule An Activity
      </Button>
    </div>
  )
}
