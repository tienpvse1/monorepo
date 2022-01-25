import { Select } from 'antd';
const { Option } = Select;

export const SelectBoxGender = () => {
  return (
    <>
      <Select placeholder='Giới tính'>
        <Option value='male'>Nam</Option>
        <Option value='female'>Nữ</Option>
        <Option value='other'>Khác</Option>
      </Select>
    </>
  );
};
