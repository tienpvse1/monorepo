import { showDeleteConfirm } from '@components/modal-cofirm/delete-confirm';
import { useToggle } from '@hooks/useToggle';
import { Col, Popover, Row } from 'antd';
import { useDeletePipelineColumn } from '@modules/pipeline-column/mutation/pipeline-column.delete';
import React from 'react';

interface PopoverActionColumnProps {
  pipelineColumnId: string;
  setShowEditForm: () => void;
}

export const PopoverActionColumn: React.FC<PopoverActionColumnProps> = ({ children, pipelineColumnId, setShowEditForm }) => {

  const [visible, setVisible] = useToggle();
  const { deletePipelineColumn } = useDeletePipelineColumn();

  const handleDelete = () => {
    showDeleteConfirm(() => deletePipelineColumn(pipelineColumnId));
    setVisible();
  }

  const handleEdit = () => {
    setShowEditForm();
  }

  return (
    <>
      <Popover
        placement="bottomLeft"
        content={
          <Row className="popover-content" gutter={[0, 4]}>
            <Col span={24}>
              <span onClick={handleEdit}>Edit stage</span>
            </Col>
            <Col span={24}>
              <span onClick={handleDelete}>Delete</span>
            </Col>
          </Row>
        }
        trigger="click"
        visible={visible}
        onVisibleChange={setVisible}
      >
        {children}
      </Popover>
    </>
  );
};
