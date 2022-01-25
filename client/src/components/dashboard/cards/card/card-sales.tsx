import { LineChartOutlined, MoreOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import CountUp from "react-countup";

export const CardSale = () => {
    return (
        <Card className='featured-item' headStyle={{ color: '#082253' }} title="Total Sales" bordered={true} extra={<MoreOutlined />}>
            <Row gutter={[40, 24]} className='feature-container'>
                <Col span={8} >
                    <span className='feature-info'>$<CountUp end={13} duration={4} delay={0.5} />k</span>
                </Col>
                <Col span={8} className='feature-cover'>
                    <span className='featureRate'>+$2,700
                    </span>
                </Col>
                <Col span={8}>
                    <LineChartOutlined className='featureIcon' />
                </Col>
            </Row>
            <span className='featureSub'>Since last week</span>
        </Card>
    )
}
