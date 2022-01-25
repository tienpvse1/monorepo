import { ThemeColor } from '@constance/color';
import { Col, Row } from 'antd'
import { AdminColumnChart } from './sub-content-left/column-chart';
import { SmallStatistic } from './sub-content-right/small-statistic';

export const ContentStatistic = () => {

  return (
    <>
      <Row gutter={[42, 0]}>
        <Col span={14} >
          <AdminColumnChart />
        </Col>
        <Col
          span={10}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: ThemeColor.cardBorder,
            boxShadow: ThemeColor.boxShadowCardDashBoard
          }}
        >
          <SmallStatistic />
        </Col>
      </Row>
    </>
  )
}