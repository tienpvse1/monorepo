import { MoreOutlined } from '@ant-design/icons';
import { ThemeColor } from '@constance/color';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { useDeletePipelineColumn } from '@modules/pipeline-column/mutation/pipeline-column.delete';
import { Button, Typography, message } from 'antd';
import { CSSProperties } from 'react';
const { Text } = Typography;
import { PopoverAction } from '../../popover/popover-action';
import numberSeparator from "number-separator";

interface HeaderColumnNameProps {
  pipelineColumn: IPipelineColumn;
  setShowInput: () => void;
  isRoleAdmin: boolean;
}

export const ColumnHeaderName: React.FC<HeaderColumnNameProps> = ({
  pipelineColumn,
  setShowInput,
  isRoleAdmin
}) => {
  const { mutate: deletePipelineColumn } = useDeletePipelineColumn();

  const onDeletePipelineColumn = () => deletePipelineColumn(pipelineColumn.id, {
    onSuccess: () => {
      message.success('Deleted stage successfully!')
    }
  });

  const props: CSSProperties = {
    textAlign: 'center',
    width: '100%'
  }

  return (
    <>
      <span className='title-pipeline-column' style={isRoleAdmin ? {} : { ...props }}>
        <Text
          ellipsis={{ tooltip: pipelineColumn.name }}
        >
          {pipelineColumn.name}
        </Text>
      </span>
      {isRoleAdmin &&
        <PopoverAction
          option1='Edit stage'
          option2='Delete'
          handleOption1={setShowInput}
          handleOption2={onDeletePipelineColumn}
          isWon={pipelineColumn.isWon}
          opportunityQty={pipelineColumn?.pipelineItems.length}
          expectedRevenue={numberSeparator(pipelineColumn.pipelineItems.reduce((acc, value) => acc + value.expectedRevenue, 0), '.')}
        >
          <Button
            icon={<MoreOutlined />}
            style={{
              border: 'none',
              backgroundColor: ThemeColor.darkGreyBackgroundColor,
            }}
          />
        </PopoverAction>}
    </>
  );
};
