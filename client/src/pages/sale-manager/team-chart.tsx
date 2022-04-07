import { Card, Col, DatePicker, PageHeader, Row, Tag } from "antd";
import { useTeams } from "@modules/team/query/team.get";
import { ColumnPlot } from "@components/chart/column-plot";
import moment from "moment";
import { useEffect, useState } from "react";
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { dateFormat } from "@constance/date-format";
const { RangePicker } = DatePicker;
const { DEFAULT } = dateFormat;

const TeamChart = () => {
  const { data: teams } = useTeams();
  const [teamFilter, setTeamFilter] = useState<any>();

  const handleFilterMoment = (
    array: IPipelineItem[],
    beforeTime = moment().subtract(1, 'months'),
    afterTime = moment()
  ) => {
    return array.filter((value) =>
      moment(value.createdAt, DEFAULT)
        .isBetween(moment(beforeTime, DEFAULT), moment(afterTime, DEFAULT), undefined, '[]')).length
  }

  useEffect(() => {
    const teamFilter = teams?.map((team) => {
      return {
        id: team.id,
        name: team.name,
        account: team.accounts.map((account) => {
          return {
            salesMan: `${account.firstName} ${account.lastName}`,
            opportunity: handleFilterMoment(account.pipelineItems)
          }
        })
      }
    })
    setTeamFilter(teamFilter);
  }, [teams])

  const handleUpdateTeamData = (
    beforeTime: moment.Moment,
    afterTime: moment.Moment,
    teamId: string
  ) => {
    const teamFilterDate = teams?.map((team) => {
      return {
        id: team.id,
        name: team.name,
        account: team.accounts.map((account) => {
          if (team.id === teamId) {
            return {
              salesMan: `${account.firstName} ${account.lastName}`,
              opportunity: handleFilterMoment(account.pipelineItems, beforeTime, afterTime)
            }
          } else {
            return {
              salesMan: `${account.firstName} ${account.lastName}`,
              opportunity: handleFilterMoment(account.pipelineItems)
            }
          }
        })
      }

    });

    setTeamFilter(teamFilterDate);
  }

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
          <Col key={team.id} span={16}>
            <Card
              key={team.id}
              title={team.name}
              extra={
                <RangePicker
                  defaultValue={[moment().subtract(1, 'months'), moment()]}
                  onChange={(data) => {
                    data && handleUpdateTeamData(data[0], data[1], team.id);
                  }}
                />
              }
              style={{ width: 800, height: 300 }}
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
