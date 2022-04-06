import { Card, Col, DatePicker, PageHeader, Row, Tag } from "antd";
import { useTeams } from "@modules/team/query/team.get";
import { ColumnPlot } from "@components/chart/column-plot";
const { RangePicker } = DatePicker;

const TeamChart = () => {
  const { data: teams } = useTeams();

  const teamFilter = teams?.map((team) => {
    return {
      name: team.name,
      account: team.accounts.map((account) => {
        return {
          salesMan: `${account.firstName} ${account.lastName}`,
          opportunity: account.pipelineItems.length
        }
      })
    }
  })

  return (
    <div className="container-page">
      <PageHeader
        className='site-page-header'
        onBack={() => window.history.back()}
        title={
          <>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span>
                Column Plot <br />
                <Tag color={'volcano'}>Seller's opportunity</Tag>
              </span>
            </span>
          </>
        }
      />
      <Row gutter={[16, 20]}>
        {teamFilter?.map((team) => (
          <Col span={12}>
            <Card
              title={team.name}
              extra={<RangePicker />}
              style={{ width: 450, height: 300 }}
            >
              <ColumnPlot data={team.account} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
export default TeamChart;
