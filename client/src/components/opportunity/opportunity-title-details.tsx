import { envVars } from "@env/var.env"
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { Button, Col, Row, Space } from "antd"

interface OpportunityTitleDetailsProps {
  opportunity?: IPipelineItem;
}

export const OpportunityTitleDetails: React.FC<OpportunityTitleDetailsProps> = ({ opportunity }) => {
  return (
    <>
      <div className="container-title-details">
        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`${envVars.VITE_BE_DOMAIN}/files/crown.png`}
                width={47}
                height={47}
              />
              <div style={{ marginLeft: '10px' }}>
                <span style={{
                  fontSize: '16px',
                  color: 'rgba(0,0,0,0.7)',
                }}
                >
                  Opportunity
                </span>

                <div style={{ fontSize: '20px', fontWeight: '700' }}>
                  {opportunity.name}
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <Space style={{ float: 'right' }}>
              <Button
                className='button-ant-custom-style'
                type='primary'
                size='middle'
              >
                Edit All
              </Button>
            </Space>
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <table className="mini-table-details">
            <tbody>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Close Date</th>
                <th>Opportunity Owner</th>
              </tr>
              <tr>
                <td>
                  {opportunity.title}
                </td>
                {/* //TODO this is still hard code */}
                <td>16.000.000 đ</td>
                <td>
                  {opportunity.expectedClosing}
                </td>

                {/* //TODO this is still hard code */}
                <td>chuongnguyen</td>
              </tr>
            </tbody>
          </table>
        </Row>
      </div>
    </>
  )
}