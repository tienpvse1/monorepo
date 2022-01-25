import { Form, Select } from 'antd';
const { Option } = Select;

export const SelectBoxPrefix = () => {
  return (
    <>
      <Form.Item name='prefix' noStyle>
        <Select style={{ width: 70 }}>
          <Option value='86'>+86</Option>
          <Option value='87'>+87</Option>
          <Option value='84'>+84</Option>
        </Select>
      </Form.Item>
    </>
  );
};
