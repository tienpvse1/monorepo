import { Collapse } from 'antd';
interface WarningModalProps {
  errors: { message: string; id: string }[];
  setErrors: React.Dispatch<
    React.SetStateAction<{ message: string; id: string }[]>
  >;
}

const WarningModal: React.FC<WarningModalProps> = ({ errors, setErrors }) => {
  return (
    <Collapse
      style={{
        width: '40vw',
        marginLeft: '3vw',
      }}
      defaultActiveKey={['1']}
    >
      {errors.length > 0 && (
        <Collapse.Panel header='Errors' key='1'>
          {errors.map((error) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              key={error.id}
            >
              <span>{error.message}</span>
            </div>
          ))}
        </Collapse.Panel>
      )}
    </Collapse>
  );
};

export default WarningModal;
