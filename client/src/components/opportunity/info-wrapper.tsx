import { FormOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useHandleNavigate } from '@hooks/useHandleNavigate';
interface InfoWrapperProps {
  title?: string;
  contactId: string;
}

export const InfoWrapper: React.FC<InfoWrapperProps> = ({
  children,
  title = '',
  contactId
}) => {
  const navigate = useNavigate();
  const { navigateRole } = useHandleNavigate();

  return (
    <div style={{ marginTop: '40px' }}>
      <div>
        <span
          style={{
            fontSize: 16,
            color: 'rgb(255,83,81)',
          }}
        >
          {title}
        </span>
        <span
          style={{
            marginLeft: 20,
            color: 'rgb(255,83,81)',
          }}
        >
          <FormOutlined onClick={() => navigate(`${navigateRole}contact/view-details/${contactId}`)} />
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
};
