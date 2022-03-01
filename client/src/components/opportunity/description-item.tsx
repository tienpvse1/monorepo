import { Col, Row } from 'antd';
import { ReactNode } from 'react';
interface DescriptionItemProps {
  title: string;
  content: ReactNode;
}
export const DescriptionItem: React.FC<DescriptionItemProps> = ({
  content,
  title
}) => {
  return (
    <>
      <Row>
        <Col className='site-description-item-p-label' span={12}><p>{title} </p></Col>
        <Col span={12}>{content}</Col>
      </Row>
    </>
  );
};
