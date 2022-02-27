import { PlusOutlined } from '@ant-design/icons';
import { useToggle } from '@hooks/useToggle';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { Button } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { PipelineItems } from './items';
import { ColumnNameHeader } from './pipeline-column/column-name-header';
import { FormEditColumnName } from './pipeline-column/form-edit-column-name';

interface PipeLineColumnProps {
  pipelineColumn: IPipelineColumn;
  index: number;
}

export const PipeLineColumn: React.FC<PipeLineColumnProps> = ({
  pipelineColumn,
  index,
}) => {
  const [showCreateItemForm, setShowCreateItemForm] = useToggle();
  const [showInput, setShowInput] = useToggle();

  return (
    <Draggable draggableId={pipelineColumn.id} index={index}>
      {(providedColumn) => (
        <div
          className='wrapper-draggable-pipeline-column'
          ref={providedColumn.innerRef}
          {...providedColumn.draggableProps}
        >
          <div
            {...providedColumn.dragHandleProps}
            className='pipeline-column-header'
          >
            {showInput ? (
              <FormEditColumnName
                pipelineColumn={pipelineColumn}
                setShowInput={setShowInput}
              />
            ) : (
              <ColumnNameHeader
                pipelineColumn={pipelineColumn}
                setShowInput={setShowInput}
              />
            )}
          </div>
          <Button
            onClick={setShowCreateItemForm}
            style={{ marginTop: '10px', width: '100%', border: 'none' }}
          >
            <PlusOutlined />
          </Button>
          <PipelineItems
            showCreateItemForm={showCreateItemForm}
            setShowCreateItemForm={setShowCreateItemForm}
            pipelineColumn={pipelineColumn}
          />
        </div>
      )}
    </Draggable>
  );
};
