import { envVars } from "@env/var.env"
import { IContact } from "@modules/contact/entity/contact.entity"
import { Button, Col, Row, Space } from "antd"

interface PageDetailsTitleProps {
  contact: IContact;
}

export const PageDetailsTitle: React.FC<PageDetailsTitleProps> = ({ contact }) => {
  return (
    <div className="container-title-details">
      <Row style={{ alignItems: 'center' }}>
        <Col span={12}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={`${envVars.VITE_BE_DOMAIN}/files/contact.png`}
              width={47}
              height={47}
            />
            <div style={{ marginLeft: '10px' }}>
              <span style={{
                fontSize: '16px',
                color: 'rgba(0,0,0,0.7)',
              }}
              >
                Contact
              </span>

              <div style={{ fontSize: '20px', fontWeight: '700' }}>
                {contact.name}
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
              <th>Phone</th>
              <th>Email</th>
              <th>Contact Owner</th>
            </tr>
            <tr>
              <td>{contact.title}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>

              {/* //TODO this is still hard code */}
              <td>chuongnguyen</td>
            </tr>
          </tbody>
        </table>
      </Row>
    </div>
  )
}
