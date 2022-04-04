import { PlusOutlined } from '@ant-design/icons'
import { SearchBar } from '@components/search-bar'
import { Button, Col, Row, Space } from 'antd'
import { envVars } from '@env/var.env';
import { searchCompany } from '@modules/company/query/company.get';

interface CompanyTitleTableProps {
  toggleCreateModal: () => void;
  setDataCompany: (value: []) => void;
}

export const CompanyTitleTable: React.FC<CompanyTitleTableProps> = ({
  toggleCreateModal,
  setDataCompany
}) => {
  return (
    <>
      <div style={{ padding: '10px' }}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`${envVars.VITE_BE_DOMAIN}/files/enterprise.png`}
                width={50}
                height={50}
              />
              <span
                style={{
                  fontSize: '27px',
                  color: 'rgba(0,0,0,0.7)',
                  fontWeight: '700',
                  marginLeft: '10px'
                }}
              >
                Company
              </span>
            </div>
          </Col>
          <Col span={12}>
            <Space style={{ float: 'right' }}>
              <Button
                className='button-ant-custom-style'
                type='primary'
                size='middle'
                onClick={toggleCreateModal}
              >
                <PlusOutlined /> New Company
              </Button>
            </Space>
          </Col>
        </Row>
        <Row style={{ alignItems: 'center' }}>
          <Col span={6}>
          </Col>
          <Col span={18} style={{ textAlign: 'center' }}>
            <Space style={{ float: 'right', marginTop: '10px' }}>
              <SearchBar
                width={400}
                placeholder='Search for name, phone, city or country'
                setData={setDataCompany}
                getApi={searchCompany}
              />
            </Space>
          </Col>
        </Row>
      </div>
    </>
  )
}
