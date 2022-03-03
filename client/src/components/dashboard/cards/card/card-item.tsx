import { DollarOutlined, MoreOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import { CardItemProps } from '../cards';

export const CardItem: React.FC<CardItemProps> = ({
  title,
  countUpEnd,
  rate,
  updateStatus,
}) => {
  return (
    <Card
      className='featured-item'
      title={title}
      bordered={true}
      extra={<MoreOutlined />}
    >
      <Row gutter={[40, 24]} className='feature-container'>
        <Col span={8}>
          <span className='feature-info'>
            $<CountUp end={countUpEnd} duration={4} delay={0.5} />k
          </span>
        </Col>
        <Col span={8} className='feature-cover'>
          <span className='featureRate'>+${rate}</span>
        </Col>
        <Col span={8}>
          <DollarOutlined className='featureIcon' />
        </Col>
      </Row>
      <span className='featureSub'>{updateStatus}</span>
    </Card>
  );
};
