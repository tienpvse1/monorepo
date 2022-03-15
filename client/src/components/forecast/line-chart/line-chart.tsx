import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Dispatch, SetStateAction } from 'react';

interface LineChartProps {
  data: IPipelineItem[][];
  setData: Dispatch<SetStateAction<IPipelineItem[][]>>;
}

export const LineChart: React.FC<LineChartProps> = ({}) => {
  return <div>This is Line chart</div>;
};
