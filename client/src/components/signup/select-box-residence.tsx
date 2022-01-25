import { Cascader } from 'antd';

export const SelectBoxResidence = () => {
  const residences = [
    {
      value: 'tphcm',
      label: 'TP.HCM',
    },
    {
      value: 'hanoi',
      label: 'Hà Nội',
    },
    {
      value: 'tpthuduc',
      label: 'TP. Thủ Đức',
    },
  ];

  return (
    <>
      <Cascader placeholder='Tỉnh/Thành Phố' options={residences} />
    </>
  );
};
