import { ArrowDownOutlined, ArrowUpOutlined, BarChartOutlined, FileTextOutlined, FundOutlined, TeamOutlined } from '@ant-design/icons'
import { ICardSales } from '@interfaces/admin/card-sales';
import { Badge, Card } from 'antd';
import { ThemeColor } from "../../../constance/color";


interface CardSalesProps {
  cardInfo: ICardSales;
  cardIndex: number;
}

const CardSales = ({ cardInfo, cardIndex }: CardSalesProps) => {
  return (
    <Badge.Ribbon color={cardInfo.color} text={
      <>
        {cardIndex == 0 && <FundOutlined className='icon-card-sales icon-color-0' />}
        {cardIndex == 1 && <BarChartOutlined className='icon-card-sales icon-color-1' />}
        {cardIndex == 2 && <FileTextOutlined className='icon-card-sales icon-color-2' />}
        {cardIndex == 3 && <TeamOutlined className='icon-card-sales icon-color-3' />}
      </>
    }>
      <Card
        bordered={false}
        title={<span className='title-card-sales'>{cardInfo.title}</span>}
        className="card-sales"
      >
        <>
          <div className="number-of-sales">{cardInfo.numberOfSales}</div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px'
          }}>
            {cardInfo.percent.status == 'increase' ?
              <span style={{ color: ThemeColor.percentColorIncrease }} className="percent-card" >
                <ArrowUpOutlined />+{cardInfo.percent.value}%
              </span> :
              <span style={{ color: ThemeColor.percentColorDecrease }} className="percent-card" >
                <ArrowDownOutlined />-{cardInfo.percent.value}%
              </span>
            }
            <span className="link-report"><a href="#">View Report</a></span>
          </div>
        </>
      </Card>
    </Badge.Ribbon>
  )
}

export default CardSales
