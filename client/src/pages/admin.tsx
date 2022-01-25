import { WrapperRowCard } from "@components/admin/header-layout/wrapper-row-card";
import { SearchBar } from "@components/search-bar";
import { ICardSales } from "@interfaces/admin/card-sales";
import { Col, Row } from "antd"
import { WrapperRowTitle } from "@components/layout/title-pages/wrapper-row-title";
import { ContentStatistic } from "@components/admin/content-statistic-layout/content-statistic";
import { TableTopSales } from "@components/admin/footer-layout/table-top-sales";


export const AdminPage = () => {

  const dataCard: ICardSales[] =
    [
      {
        title: 'Product Sold',
        numberOfSales: '13.8k',
        percent: {
          status: 'increase',
          value: 12
        },
        color: '#fff3f0'
      },
      {
        title: 'Total Profit',
        numberOfSales: '$1.237k',
        percent: {
          status: 'decrease',
          value: 13
        },
        color: '#fff6f0'
      },
      {
        title: 'Total No. of Claims',
        numberOfSales: '1.3M',
        percent: {
          status: 'increase',
          value: 10
        },
        color: '#fffbf0'
      },
      {
        title: 'New Customer',
        numberOfSales: '25.6k',
        percent: {
          status: 'increase',
          value: 9
        },
        color: '#f0f6ff'
      }

    ]
  return (
    <>
      <WrapperRowTitle
        className="wrapper-title-page"
        title="OverView"
        titleSize="27px"
        children={<SearchBar placeholder="Search for id, name or phone number" />}
      />
      <Row gutter={[0, 46]}>
        <Col className="header-admin-page" span={24}>
          <WrapperRowCard dataCard={dataCard} />
        </Col>

        <Col className="content-statistic-admin-page" span={24}>
          <ContentStatistic />
        </Col>

        <Col className="table-admin-page" style={{ height: '420px' }} span={24}>
          <TableTopSales />
        </Col>
      </Row>
    </>
  )
}
