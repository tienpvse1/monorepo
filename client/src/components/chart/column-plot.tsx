import { Column } from '@ant-design/charts';
import { ThemeColor } from "../../constance/color";

interface ColumnPlotProps {
  data: any
}

export const ColumnPlot: React.FC<ColumnPlotProps> = ({ data }) => {
  // const paletteSemanticPink = '#f8cbca';
  const brandColor = ThemeColor.primaryColor;
  const config: any = {
    data: data,
    width: 420,
    height: 200,
    autoFit: true,
    xField: 'salesMan',
    yField: 'opportunity',
    color: brandColor,
    // seriesField: 'temp',
    // color: (value: any) => {
    //   console.log("dataColor:", value);
    //   if (value <= 3) {
    //     return paletteSemanticPink;
    //   }

    //   return brandColor;
    // },
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
