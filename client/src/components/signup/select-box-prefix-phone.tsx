import { Form, Select } from 'antd';
const { Option } = Select;

export const SelectBoxPrefix = () => {
  return (
    <>
      <Form.Item name='prefixMobile' noStyle>
        <Select style={{ width: 70 }}>
          <Option value="84">+84</Option>
        </Select>
      </Form.Item>
    </>
  );
};
