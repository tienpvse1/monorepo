import { useQueryProvinces } from '@modules/provinces/query/provinces.get';
import { Cascader } from 'antd';

export const SelectBoxDistrict = () => {

  const { data: provinceData } = useQueryProvinces();

  const cityData = provinceData && provinceData.map((province) => {
    return {
      value: province.codename,
      label: province.name,
      children: province.districts.map((district) => {
        return {
          value: district.codename,
          label: district.name
        }
      })
    }
  })
  return (
    <>
      <Cascader placeholder='Province/State' options={cityData} />
    </>
  );
};
