import { Card, Col, Row } from 'antd';
import { ReactNode } from 'react';

interface MiniCardStatisticProps {
  titleCard: string;
  content: ReactNode;
  contentBottom: ReactNode;
  chartComponent: ReactNode;
}

export const CardStatistic = ({ content, titleCard, contentBottom, chartComponent }: MiniCardStatisticProps) => {
  return (
    <>
      <Row>
        <Col span={16}>
          <Card
            bordered={false}
            title={<span className='title-card-sales-2'>{titleCard}</span>}
          >
            <>
              <div className="number-of-sales-2">
                {content}
              </div>
              <div style={{ marginLeft: '10px' }} >
                {contentBottom}
              </div>
            </>
          </Card>
        </Col>
        <Col style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }} span={8}>
          {chartComponent}
        </Col>
      </Row>
    </>
  )
};
