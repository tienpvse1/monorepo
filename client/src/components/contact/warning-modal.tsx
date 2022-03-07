import { Message } from '@common/upload';
import { Button, Collapse } from 'antd';

interface WarningModalProps {
  warnings: Message[];
  errors: Message[];
  setErrors: React.Dispatch<React.SetStateAction<Message[]>>;
  setWarnings: React.Dispatch<React.SetStateAction<Message[]>>;
}

const WarningModal: React.FC<WarningModalProps> = ({
  errors,
  warnings,
  setErrors,
  setWarnings,
}) => {
  const toggleResolve = (id: string) => {
    setErrors((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          console.log('founded');
          return { ...item, resolved: !item.resolved };
        } else return item;
      })
    );
  };
  const toggleResolveWarning = (id: string) => {
    setWarnings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, resolved: !item.resolved };
        } else return item;
      })
    );
  };
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
              <Button
                onClick={() => toggleResolve(error.id)}
                type={error.resolved ? 'primary' : 'ghost'}
              >
                {error.resolved ? 'removed' : 'remove'}
              </Button>
            </div>
          ))}
        </Collapse.Panel>
      )}
      {warnings.length > 0 && (
        <Collapse.Panel header='Warnings' key='1'>
          {warnings.map((warning) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              key={warning.id}
            >
              <span>{warning.message}</span>
              <Button
                onClick={() => toggleResolveWarning(warning.id)}
                type={warning.resolved ? 'primary' : 'ghost'}
              >
                {warning.resolved ? 'resolved' : 'mark as resolved resolve'}
              </Button>
            </div>
          ))}
        </Collapse.Panel>
      )}
    </Collapse>
  );
};

export default WarningModal;
