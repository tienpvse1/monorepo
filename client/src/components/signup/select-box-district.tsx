import { useQueryProvinces } from '@modules/provinces/query/provinces.get';
import { Cascader, Form } from 'antd';

export const SelectBoxDistrict = () => {

  const { data: provinceData } = useQueryProvinces();

  const cityData = provinceData && provinceData.map((province) => {
    return {
      value: province.name,
      label: province.name,
      children: province.districts.map((district) => {
        return {
          value: district.name,
          label: district.name
        }
      })
    }
  })
  // const filter = (inputValue, path) => {
  //   return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  // }

  return (
    <Form.Item
      name="residence"
      label="Habitual Residence"
      style={{width: '100%'}}
      rules={[
        { type: 'array' }
      ]}
    >
      <Cascader
        placeholder='Select City / State ...'
        options={cityData}
      // showSearch={{ filter }}
      />
    </Form.Item>
  );
};
