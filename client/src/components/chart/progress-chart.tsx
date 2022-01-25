import { Progress, Tooltip } from "antd";
import { ReactNode } from "react";
import { useCountUp } from "react-countup";

interface ProgressChartProps {
  tooltipText: string;
  percent: number;
  strokeWidth?: number;
  width: number;
  format?: ReactNode;
  annotation?: ReactNode;
}

export const ProgressChart = ({
  tooltipText,
  percent,
  strokeWidth = 5,
  width,
  format,
  annotation
}: ProgressChartProps) => {
  const { countUp } = useCountUp({
    end: percent,
    duration: 4,
    delay: 0.5
  });
  return (
    <>
      <Tooltip title={tooltipText}>
        <Progress
          percent={countUp as number}
          strokeWidth={strokeWidth}
          format={() => format}
          width={width}
          type="circle" />
        {annotation}
      </Tooltip>
    </>
  );
};
