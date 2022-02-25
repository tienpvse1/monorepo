import { DatePicker, Form, Input, InputNumber } from 'antd';
import { Rule } from 'antd/lib/form';
import { HTMLAttributes } from 'react';

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: any;
  title: string;
  inputType?: 'number' | 'text' | 'datePicker';
  recordIndex: string;
  editingIndex: string;
  record: any;
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

  let inputNode = <Input style={{ height: '40px' }} />;
  switch (inputType) {
    case 'number':
      inputNode = <InputNumber />;
      break;
    case 'datePicker':
      inputNode = <DatePicker style={{ height: '40px' }} />;
      break;
  }

  return (
    <>
      {editing && recordIndex === editingIndex ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }} rules={rules}>
          {inputNode}
        </Form.Item>
      ) : (
        <span>{record[dataIndex]}</span>
      )}
    </>
  );
};
