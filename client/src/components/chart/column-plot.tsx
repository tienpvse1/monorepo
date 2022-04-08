import { Column } from '@ant-design/charts';
import { ThemeColor } from "../../constance/color";

interface ColumnPlotProps {
  data: any;
}

export const ColumnPlot: React.FC<ColumnPlotProps> = ({ data }) => {
  const brandColor = ThemeColor.primaryColor;
  const config: any = {
    data: data,
    width: 900,
    height: 200,
    autoFit: true,
    xField: 'salesMan',
    yField: 'opportunity',
    color: brandColor,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      tickInterval: 1
    },
    meta: {
      opportunity: {
        alias: 'Opportunity'
      }
    }
  };
  return (
    <>
      <Column {...config} />
    </>
  )
}
