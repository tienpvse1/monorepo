import { Card, Col, Row } from "antd";
import { useTeams } from "@modules/team/query/team.get";
import { ColumnPlot } from "@components/chart/column-plot";
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
      <Row gutter={[16, 20]}>
        {teamFilter?.map((team) => (
          <Col span={12}>
            <Card
              title={team.name}
              extra={<a href="#">More</a>}
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
