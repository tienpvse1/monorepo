import { ICardSales } from '@interfaces/admin/card-sales'
import { Col, Row } from 'antd'
import CardSales from './card-sales'

interface WrapperRowCardProps {
  dataCard: ICardSales[];
}

export const WrapperRowCard = ({ dataCard }: WrapperRowCardProps) => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {dataCard.map((cardInfo: any, index: number) =>
        <Col key={cardInfo.title} span={6}>
          <CardSales cardInfo={cardInfo} cardIndex={index} />
        </Col>)}
    </Row>
  )
}
