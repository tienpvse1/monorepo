import { ArrowUpOutlined, StarFilled } from '@ant-design/icons';
import { ProgressChart } from '@components/chart/progress-chart';
import { TinyLineChart } from '@components/chart/tiny-line';
import { ThemeColor } from '@constance/color';
import { Col, Row } from 'antd';
import { AvatarGroup } from './avatar-group';
import { CardStatistic } from './card-statistic';

export const SmallStatistic = () => {

  return <>
    <Row>
      <Col span={24}>
        <CardStatistic
          titleCard="Sales Team Target"
          content={
            <>
              <span>75%</span>
              <span style={{ float: 'right', marginTop: '17px', marginRight: '17px' }}>
                <AvatarGroup />
              </span>
            </>
          }
          contentBottom={
            <span className="note-report">Achieved</span>
          }
          chartComponent={
            <ProgressChart
              tooltipText="75% Achieved"
              percent={75}
              width={110}
              format={<span className='icon-chart'><StarFilled style={{color: '#FFEE58'}} /></span>}
            />
          }
        />
      </Col>
      <Col span={24}>
        <CardStatistic
          titleCard="Cleared Queue"
          content={
            <>
              25k
            </>
          }
          contentBottom={
            <>
              <span className="note-report">No of Bills</span>
              <span style={{ color: ThemeColor.percentColorIncrease, marginLeft: '20px' }} className="percent-card" >
                <ArrowUpOutlined />+12%
              </span>
            </>
          }
          chartComponent={<TinyLineChart />}
        />
      </Col>
    </Row>
  </>;
};
