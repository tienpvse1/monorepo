import { MoreOutlined } from "@ant-design/icons";
import { ThemeColor } from "@constance/color";
import { IPipelineColumn } from "@modules/pipeline-column/entity/pipeline-column.entity";
import { useDeletePipelineColumn } from "@modules/pipeline-column/mutation/pipeline-column.delete";
import { Button } from "antd";
import { PopoverAction } from "../../popover/popover-action";

interface ColumnNameHeaderProps {
  pipelineColumn: IPipelineColumn;
  setShowInput: () => void;
}

export const ColumnNameHeader: React.FC<ColumnNameHeaderProps> = ({ pipelineColumn, setShowInput }) => {

  const { deletePipelineColumn } = useDeletePipelineColumn();

  const onDeletePipelineColumn = () => deletePipelineColumn(pipelineColumn.id);
  

  return (
    <>
      <span className="title-pipeline-column" >
        {pipelineColumn.name}
      </span>
      <PopoverAction
        itemName1="Edit stage"
        itemName2="Delete"
        callbackMethodDelete={onDeletePipelineColumn}
        callbackMethodUpdate={setShowInput}
      >
        <Button
          icon={<MoreOutlined />}
          style={{ border: 'none', backgroundColor: ThemeColor.darkGreyBackgroundColor }}
        />
      </PopoverAction>
    </>
  );
};
