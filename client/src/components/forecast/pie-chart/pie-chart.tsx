import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { Dispatch, SetStateAction } from "react";

interface PieChartProps {
  data: IPipelineItem[][];
  setData: Dispatch<SetStateAction<IPipelineItem[][]>>;
}

export const PieChart: React.FC<PieChartProps> = ({}) => {
  return <div>This is Pie chart</div>;
};
