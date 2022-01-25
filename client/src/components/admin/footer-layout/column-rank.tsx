import { Tag } from "antd";

interface ColumnRankProps {
  name: string;
}

export const ColumnRank = ({ name }: ColumnRankProps) => {
  return (
    <div >
      {name == 'Gold' && <Tag color="gold">{name}</Tag>}
      {name == 'Silver' && <Tag color="default">{name}</Tag>}
      {name == 'Bronze' && <Tag color="volcano">{name}</Tag>}
    </div>
  );
};
