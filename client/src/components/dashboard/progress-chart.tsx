import { MoreOutlined } from '@ant-design/icons';
import { ChartAnnotation } from '@components/chart/chart-annotation';
import { LiquidChart } from '@components/chart/progress-liquid-chart';
import { Col, Row } from 'antd';

export const DashBoardProgressChart = () => {
  return (
    <>
      <div className='progress-chart'>
        <Row style={{ width: '100%' }}>
          <Col span={16} >
            <h1 style={{ fontSize: '17px' }}>Progress Chart</h1>
          </Col>
          <Col span={8}>
            <MoreOutlined style={{float: 'right', fontSize: '17px', marginTop: '5px'}} />
          </Col>
        </Row>
        <LiquidChart percent={0.45}/>
        <ChartAnnotation
          titleDot1="Bank Transfer"
          titleDot2="Credit Card"
          styleNameDot1="dot"
          styleNameDot2="dot second"
          styleNameWrapperDot="info"
        />
      </div>
    </>
  );
};
