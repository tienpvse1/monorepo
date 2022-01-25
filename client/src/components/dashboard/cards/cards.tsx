import { Col, Row } from 'antd';
import { controllers } from '../../../constance/controllers';
import { CardMoney, CardOrders, CardSale, CardTicket } from './card';

const { SIZE_CARD, SIZE_OFFSET } = controllers;

export const CardBoard = () => {
    const SIZE_GUTTER = 18;
    return (
        <>
            <div className="site-card-wrapper">
                <Row gutter={SIZE_GUTTER}>
                    <Col span={SIZE_CARD} offset={SIZE_OFFSET}>
                        <CardMoney />
                    </Col>
                    <Col span={SIZE_CARD}>
                        <CardOrders />
                    </Col>
                    <Col span={SIZE_CARD}>
                        <CardSale />
                    </Col>
                    <Col span={SIZE_CARD}>
                        <CardTicket />
                    </Col>
                </Row>
            </div>
        </>
    )
}
