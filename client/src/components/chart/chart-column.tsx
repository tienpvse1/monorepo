import { Column } from '@ant-design/charts';
import { ThemeColor } from "../../constance/color";

export const ChartColumn = () => {
  const paletteSemanticPink = '#f8cbca';
  const brandColor = ThemeColor.primaryColor;
  const data = [
    {
      type: '2015',
      value: 15,
    },
    {
      type: '2016',
      value: 5,
    },
    {
      type: '2017',
      value: 9,
    },
    {
      type: '2018',
      value: 30,
    },
    {
      type: '2019',
      value: 24,
    },
    {
      type: '2020',
      value: 40,
    },
    {
      type: '2021',
      value: 20,
    },
    {
      type: '2022',
      value: 30,
    },
  ];
  const config: any = {
    data,
    width: 706,
    height: 310,
    autoFit: true,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: ({ type }: any) => {
      if (type === '2016' || type === '2017') {
        return paletteSemanticPink;
      }

      return brandColor;
    },
    label: {
      content: (originData: any) => {
        const val = parseFloat(originData.value);

        if (val < 10) {
          return (val * 1).toFixed(1) + '%';
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return (
    <>
      <Column {...config} />
    </>
  )
}
