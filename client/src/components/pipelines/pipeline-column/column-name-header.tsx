import { MoreOutlined } from "@ant-design/icons";
import { ThemeColor } from "@constance/color";
import { IPipelineColumn } from "@modules/pipeline-column/entity/pipeline-column.entity";
import { Button } from "antd";
import { PopoverActionColumn } from "./popover-action";

interface ColumnNameHeaderProps {
  pipelineColumn: IPipelineColumn;
  setShowEditForm: () => void;
}

export const ColumnNameHeader: React.FC<ColumnNameHeaderProps> = ({ pipelineColumn, setShowEditForm }) => {
  return (
    <>
      <span className="title-pipeline-column" >
        {pipelineColumn.name}
      </span>
      <PopoverActionColumn pipelineColumnId={pipelineColumn.id} setShowEditForm={setShowEditForm}>
        <Button
          icon={<MoreOutlined />}
          style={{ border: 'none', backgroundColor: ThemeColor.darkGreyBackgroundColor }}
        />
      </PopoverActionColumn>
    </>
  );
};
