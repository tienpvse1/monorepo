import { Contact } from '@modules/contact/entity/contact.entity';
import { Form, Input, InputNumber } from 'antd';
import { HTMLAttributes } from 'react';

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: keyof Contact;
  title: string;
  inputType?: 'number' | 'text';
  recordIndex: string;
  editingIndex: string;
  record: Contact;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType = 'text',
  recordIndex,
  children,
  editingIndex,
  record,
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <>
      {editing && recordIndex === editingIndex ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        <p>{record[dataIndex]}</p>
      )}
    </>
  );
};
