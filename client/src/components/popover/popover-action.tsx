import { showDeleteConfirm } from '@components/modal/delete-confirm';
import { useToggle } from '@hooks/useToggle';
import { Col, Popover, Row } from 'antd';

interface PopoverActionProps {
  option1: string;
  option2: string;
  handleOption1?: () => void;
  handleOption2?: () => void;
  isWon?: boolean;
  opportunityQty?: number;
  expectedRevenue?: string;
}

export const PopoverAction: React.FC<PopoverActionProps> = ({
  children,
  option1: itemName1,
  option2: itemName2,
  handleOption2,
  handleOption1,
  isWon = false,
  expectedRevenue,
  opportunityQty
}) => {
  const [visible, setVisible] = useToggle();

  const handleDelete = () => {
    showDeleteConfirm(handleOption2, { expectedRevenue, opportunityQty });
    setVisible();
  };

  const handleEdit = () => {
    handleOption1();
    setVisible();
  };

  return (
    <Popover
      overlayClassName='my-popover'
      placement='bottomLeft'
      content={
        <Row className='my-popover-content' gutter={[0, 4]}>
          <Col span={24}>
            <span onClick={handleEdit}>{itemName1}</span>
          </Col>
          <Col style={{ cursor: isWon ? 'not-allowed' : '' }} span={24}>
            <span onClick={!isWon && handleDelete}>{itemName2}</span>
          </Col>
        </Row>
      }
      trigger='click'
      visible={visible}
      onVisibleChange={setVisible}
    >
      {children}
    </Popover>
  );
};
