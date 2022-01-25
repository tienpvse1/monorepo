import { TinyLine } from '@ant-design/charts';

export const TinyLineChart = () => {
  const data = [
    264, 300, 417, 500, 400, 309, 200, 550, 520, 467, 513, 546, 983, 340, 539, 243, 226, 192,
  ];
  const config = {
    width: 150,
    height: 120,
    autoFit: false,
    data,
    smooth: true,
    color: '#d62728'//primary color
  };
  return (
    <>
      <TinyLine {...config} />
    </>
  );
};
