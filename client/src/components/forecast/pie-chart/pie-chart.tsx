import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { Dispatch, SetStateAction } from "react";
import { Pie, measureTextWidth } from '@ant-design/plots';
import { convertNumToDate } from '@util/date';
import numberSeparator from "number-separator";

interface PieChartProps {
  data: IPipelineItem[][];
  setData: Dispatch<SetStateAction<IPipelineItem[][]>>;
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const newArray = data
    .filter((_, index) => index >= 1)
    .map((value, index) => ({
      type: convertNumToDate(index + 1),
      value: value.reduce((acc, item) => acc + item.expectedRevenue, 0)
    }));

  const renderStatistic = (containerWidth, text, style) => {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  const config: any = {
    appendPadding: 10,
    data: newArray,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} ¥`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: ({ value }) => {
        if (value == 0)
          return '';
        else
          return numberSeparator(value, '.') + 'đ'
      },
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : 'Total';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '28px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${numberSeparator(datum.value, '.')} vnd` : `${numberSeparator(data.reduce((r, d) => r + d.value, 0), '.')} vnd`;
          return renderStatistic(width, text, {
            fontSize: 28,
          });
        },
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };

  return <Pie {...config} />;
};
