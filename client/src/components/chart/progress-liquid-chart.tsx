import { ThemeColor } from '@constance/color';
import { Liquid } from '@ant-design/plots';

interface LiquidChartProps {
  percent: number;
}

export const LiquidChart = ({ percent = 0.25 }: LiquidChartProps) => {


  const config: any = {
    width: 220,
    autoFit: false,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
    color: ThemeColor.primaryColor
  };
  return (
    <>
      <Liquid percent={percent} {...config} />
    </>
  );
};
