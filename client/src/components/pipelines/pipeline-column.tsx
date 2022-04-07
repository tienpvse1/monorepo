import { PlusOutlined } from '@ant-design/icons';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useToggle } from '@hooks/useToggle';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { Button, } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { useCookies } from 'react-cookie';
import { PipelineItems } from './items';
import { ColumnHeaderName } from './pipeline-column/column-header-name';
import { FormEditColumnName } from './pipeline-column/edit-column-name-form';
import CountUp from 'react-countup';

interface PipeLineColumnProps {
  pipelineColumn: IPipelineColumn;
  index: number;
}
export const PipeLineColumn: React.FC<PipeLineColumnProps> = ({
  pipelineColumn,
  index,
}) => {
  console.log("changed");

  const [showCreateItemForm, setShowCreateItemForm] = useToggle();
  const [showInput, setShowInput] = useToggle();
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);

  const handleIsRoleAdmin = () => {
    return public_user_info.role.name === 'admin' ? true : false
  }

  return (
    <Draggable isDragDisabled={!handleIsRoleAdmin()} draggableId={pipelineColumn.id} index={index} >
      {(providedColumn) => (
        <div
          className='wrapper-draggable-pipeline-column'
          ref={providedColumn.innerRef}
          {...providedColumn.draggableProps}
        >
          {/* {!handleIsRoleAccountant() && pipelineColumn.isWon &&
            <div className="lock-component">
              <Tooltip title="Unauthorized" color={ThemeColor.primaryColor} key={'lock'}>
                <div className="lock">
                  <LockOutlined style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontSize: '28px',
                    color: ThemeColor.primaryColor
                  }} />
                </div>
              </Tooltip>
            </div>} */}

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
              <ColumnHeaderName
                isRoleAdmin={handleIsRoleAdmin()}
                pipelineColumn={pipelineColumn}
                setShowInput={setShowInput}
              />
            )}
          </div>
          <div className='price-total'>
            <span>
              <CountUp end={pipelineColumn.pipelineItems.reduce((acc, item) => {
                return acc + item.expectedRevenue
              }, 0)} duration={0.5} separator='.' />đ
            </span>
          </div>

          {!handleIsRoleAdmin() && !pipelineColumn.isWon &&
            <Button
              onClick={setShowCreateItemForm}
              style={{ marginTop: '10px', width: '100%', border: 'none' }}
            >
              <PlusOutlined />
            </Button>}

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
