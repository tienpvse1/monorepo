import { IContact } from '@modules/contact/entity/contact.entity';
import { Form, Input, InputNumber } from 'antd';
import { Rule } from 'antd/lib/form';
import { HTMLAttributes } from 'react';

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: keyof IContact;
  title: string;
  inputType?: 'number' | 'text';
  recordIndex: string;
  editingIndex: string;
  record: IContact;
  rules?: Rule[];
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
  rules = [],
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <>
      {editing && recordIndex === editingIndex ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }} rules={rules}>
          {inputNode}
        </Form.Item>
      ) : (
        <p>{record[dataIndex]}</p>
      )}
    </>
  );
};
