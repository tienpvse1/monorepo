import { envVars } from '@env/var.env'
import { Button, Col, Row, Space } from 'antd'

export const CompanyTitleDetails = () => {
  return (
    <>
      <div className="container-title-details">
        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`${envVars.VITE_BE_DOMAIN}/files/enterprise.png`}
                width={47}
                height={47}
              />
              <div style={{ marginLeft: '10px' }}>
                <span style={{
                  fontSize: '16px',
                  color: 'rgba(0,0,0,0.7)',
                }}
                >
                  Company
                </span>

                <div style={{ fontSize: '20px', fontWeight: '700' }}>
                  Company name
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
                <th>Type</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Company Owner</th>
              </tr>
              <tr>
                <td>
                  Type 1
                </td>
                {/* //TODO this is still hard code */}
                <td>0909070655</td>
                <td>
                  company@gmail.com
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
