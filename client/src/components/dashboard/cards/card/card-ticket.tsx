import { MoreOutlined, TagOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import CountUp from 'react-countup'

export const CardTicket = () => {
    return (
        <Card className='featured-item' title="Available Ticket" bordered={true} extra={<MoreOutlined />}>
            <Row gutter={[40, 24]} className='feature-container'>
                <Col span={8} >
                    <span className='feature-info'>$<CountUp end={300} duration={4} delay={0.5} /></span>
                </Col>
                <Col span={8} className='feature-cover'>
                    <span className='featureRate negative'>-$1,200
                    </span>
                </Col>
                <Col span={8}>
                    <TagOutlined className='featureIcon' />
                </Col>
            </Row>
            <span className='featureSub'>Since last week</span>
        </Card>
    )
}
