import { CrownFilled, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

interface ColumnNameProps {
  name: string;
  indexStaff: number;
}

export const ColumnName = ({ name, indexStaff }: ColumnNameProps) => {

  return (
    <>
      <Avatar size={'default'} shape="square" icon={<UserOutlined />} />
      <span className="column-name">{name}</span>
      {indexStaff == 0 &&
        <CrownFilled style={{
          marginLeft: '15px',
          fontSize: '25px',
          color: '#ebbf10'
        }} />}
    </>
  );
};
