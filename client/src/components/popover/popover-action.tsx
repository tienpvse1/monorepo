import { showDeleteConfirm } from '@components/modal-cofirm/delete-confirm';
import { useToggle } from '@hooks/useToggle';
import { Col, Popover, Row } from 'antd';
import React from 'react';

interface PopoverActionProps {
  itemName1: string;
  itemName2: string;
  callbackMethodDelete?: () => void;
  callbackMethodUpdate?: () => void;
}

export const PopoverAction: React.FC<PopoverActionProps> = ({
  children,
  itemName1,
  itemName2,
  callbackMethodDelete,
  callbackMethodUpdate
}) => {

  const [visible, setVisible] = useToggle();

  const handleDelete = () => {
    showDeleteConfirm(callbackMethodDelete);
    setVisible();
  }

  const handleEdit = () => {
    callbackMethodUpdate();
    setVisible();
  }

  return (
    <Popover
      overlayClassName="my-popover"
      placement="bottomLeft"
      content={
        <Row className="my-popover-content" gutter={[0, 4]}>
          <Col span={24}>
            <span onClick={handleEdit}>{itemName1}</span>
          </Col>
          <Col span={24}>
            <span onClick={handleDelete}>{itemName2}</span>
          </Col>
        </Row>
      }
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
    >
      {children}
    </Popover>
  );
};
