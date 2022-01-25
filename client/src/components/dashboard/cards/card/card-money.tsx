import { DollarOutlined, MoreOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import CountUp from 'react-countup'

export const CardMoney = () => {
    return (
        <Card className='featured-item' title="Available Money" bordered={true} extra={<MoreOutlined />}>
            <Row gutter={[40, 24]} className='feature-container'>
                <Col span={8} >
                    <span className='feature-info'>$<CountUp end={25} duration={4} delay={0.5} />k</span>
                </Col>
                <Col span={8} className='feature-cover'>
                    <span className='featureRate'>+$8,700
                    </span>
                </Col>
                <Col span={8}>
                    <DollarOutlined className='featureIcon' />
                </Col>
            </Row>
            <span className='featureSub'>Since last week</span>
        </Card>
    )
}

