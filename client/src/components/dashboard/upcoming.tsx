import { Alert } from 'antd';

interface UpcomingProps {
  title?: string;
  severity?: 'info' | 'success' | 'warning' | 'error';
  time?: string;
  by: string;
}

const Upcoming: React.FC<UpcomingProps> = ({
  by,
  severity,
  time,
  title = 'Title',
}) => {
  return (
    <Alert
      message={title}
      type={severity}
      closable
      style={{
        marginTop: 10,
      }}
      description={
        <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>
          <span>{time}</span>
          <br />
          <span>{by}</span>
        </div>
      }
      showIcon
    />
  );
};

export default Upcoming;
