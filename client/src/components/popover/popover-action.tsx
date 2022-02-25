import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { useToggle } from '@hooks/useToggle';
import { Col, Popover, Row } from 'antd';
import React from 'react';

interface PopoverActionProps {
  option1: string;
  option2: string;
  handleOption1?: () => void;
  handleOption2?: () => void;
}

export const PopoverAction: React.FC<PopoverActionProps> = ({
  children,
  option1: itemName1,
  option2: itemName2,
  handleOption2,
  handleOption1,
}) => {
  const [visible, setVisible] = useToggle();

  const handleDelete = () => {
    showDeleteConfirm(handleOption2);
    setVisible();
  };

  const handleEdit = () => {
    handleOption1();
    setVisible();
  };

  return (
    <>
      <Popover
        placement='bottomLeft'
        content={
          <Row className='popover-content' gutter={[0, 4]}>
            <Col span={24}>
              <span onClick={handleEdit}>{itemName1}</span>
            </Col>
            <Col span={24}>
              <span onClick={handleDelete}>{itemName2}</span>
            </Col>
          </Row>
        }
        trigger='click'
        visible={visible}
        onVisibleChange={setVisible}
      >
        {children}
      </Popover>
    </>
  );
};
