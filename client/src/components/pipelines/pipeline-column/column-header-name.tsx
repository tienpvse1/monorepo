import { MoreOutlined } from '@ant-design/icons';
import { ThemeColor } from '@constance/color';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { useDeletePipelineColumn } from '@modules/pipeline-column/mutation/pipeline-column.delete';
import { Button, Typography } from 'antd';
const { Text } = Typography;
import { PopoverAction } from '../../popover/popover-action';

interface HeaderColumnNameProps {
  pipelineColumn: IPipelineColumn;
  setShowInput: () => void;
}

export const ColumnHeaderName: React.FC<HeaderColumnNameProps> = ({
  pipelineColumn,
  setShowInput,
}) => {
  const { deletePipelineColumn } = useDeletePipelineColumn();

  const onDeletePipelineColumn = () => deletePipelineColumn(pipelineColumn.id);

  return (
    <>
      <span className='title-pipeline-column'>
        <Text
          style={{ width: '250px' }}
          ellipsis={{ tooltip: pipelineColumn.name }}
        >
          {pipelineColumn.name}
        </Text>
      </span>
      <PopoverAction
        option1='Edit stage'
        option2='Delete'
        handleOption1={setShowInput}
        handleOption2={onDeletePipelineColumn}
      >
        <Button
          icon={<MoreOutlined />}
          style={{
            border: 'none',
            backgroundColor: ThemeColor.darkGreyBackgroundColor,
          }}
        />
      </PopoverAction>
    </>
  );
};
