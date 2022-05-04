import { CoffeeOutlined, FileTextOutlined, MailOutlined, PhoneOutlined, PushpinOutlined } from '@ant-design/icons';
import { Alert, Tag } from 'antd';

interface UpcomingProps {
  title?: string;
  severity?: 'info' | 'success' | 'warning' | 'error';
  time?: string;
  by: string;
  type: string;
  isDone: boolean;
}

const Upcoming: React.FC<UpcomingProps> = ({
  by,
  severity,
  time,
  title = 'Title',
  type,
  isDone
}) => {
  return (
    <Alert
      message={title}
      type={severity}
      style={{
        marginTop: 10,
      }}
      action={
        isDone ?
          <Tag color={'purple'} style={{ borderRadius: '10px' }}>
            Done
          </Tag> :
          <Tag color={'magenta'} style={{ borderRadius: '10px' }}>
            Undone
          </Tag>
      }
      description={
        <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>
          <span>{time}</span>
          <br />
          <span>{by}</span>
        </div>
      }
      showIcon
      icon={
        type == 'Todo' && <FileTextOutlined /> ||
        type == 'Email' && <MailOutlined /> ||
        type == 'Meeting' && <CoffeeOutlined /> ||
        type == 'Call' && <PhoneOutlined /> || <PushpinOutlined />
      }
    />
  );
};

export default Upcoming;
