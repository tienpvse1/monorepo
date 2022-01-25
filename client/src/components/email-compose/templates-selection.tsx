import { CloseOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { useUpdateEmailTemplate } from '@modules/email-temlate/mutation/email-template.patch';
import { usePostEmailTemplate } from '@modules/email-temlate/mutation/email-template.post';
import { useGetAllTemplates } from '@modules/email-temlate/query/email-template.get';
import { Button, Input } from 'antd';
import React, {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';
import { Design } from 'react-email-editor';
import LoadingComponent from 'react-loading';
interface TemplateSelectionProps {
  design: Design;
  onClose: () => void;
}

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  design,
  onClose,
}) => {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = useGetAllTemplates();
  const updateEmail = useUpdateEmailTemplate();
  const { mutate } = usePostEmailTemplate();
  const toggleClicked = () => setClicked(!clicked);
  const [name, setName] = useState('');
  if (isLoading) return <LoadingComponent type='cubes' />;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setClicked(false);
      mutate({
        design,
        name,
      });
      setName('');
      onClose();
    }
  };

  const handleUpdate = (id: string) => {
    setClicked(false);
    updateEmail.mutate({
      id,
      design,
    });
  };

  return (
    <div>
      {data && data.length > 0 ? (
        <>
          <h3>Available templates</h3>
          <ul
            style={{
              transform: 'translateX(-20px)',
            }}
          >
            {data.map((item, index) => (
              <li
                key={index}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (!clicked) {
                    onClose();
                    handleUpdate(item.id || '');
                  }
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <InboxOutlined
            style={{
              fontSize: 60,
              color: 'rgba(0,0,0,0.35)',
            }}
          />
          <p
            style={{
              fontWeight: 'bold',
              color: 'rgba(0,0,0,0.6)',
            }}
          >
            There's no template
          </p>
        </div>
      )}
      <div>
        <Button
          style={{
            display: !clicked ? 'block' : 'none',
          }}
          type='link'
          onClick={toggleClicked}
          icon={<PlusOutlined />}
        >
          Save as
        </Button>
        {clicked && (
          <Input
            suffix={
              <Button
                icon={<CloseOutlined />}
                type='link'
                onClick={toggleClicked}
              />
            }
            onKeyDown={handleKeyDown}
            onChange={(e) => setName(e.target.value)}
            placeholder='Basic usage'
          />
        )}
      </div>
    </div>
  );
};
