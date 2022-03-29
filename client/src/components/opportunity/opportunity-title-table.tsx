import { PlusOutlined } from '@ant-design/icons'
import { SearchBar } from '@components/search-bar'
import { Button, Col, Row, Space } from 'antd'
import { envVars } from '@env/var.env';

interface OpportunityTitleTableProps {
  toggleCreateModal: () => void;
  setDataOpportunity?: (value: []) => void;
  searchMethod: (text: string, id?: string) => Promise<any>;
}

export const OpportunityTitleTable: React.FC<OpportunityTitleTableProps> = ({
  toggleCreateModal,
  setDataOpportunity,
  searchMethod
}) => {
  return (
    <>
      <div style={{ padding: '10px' }}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`${envVars.VITE_BE_DOMAIN}/files/crown.png`}
                width={47}
                height={47}
              />
              <span
                style={{
                  fontSize: '27px',
                  color: 'rgba(0,0,0,0.7)',
                  fontWeight: '700',
                  marginLeft: '10px'
                }}
              >
                Opportunity
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
                <PlusOutlined /> New Opportunity
              </Button>
            </Space>
          </Col>
        </Row>
        <Row style={{ alignItems: 'center' }}>
          <Col span={6}>
            <span> Updated 9 hours ago </span>
          </Col>
          <Col span={18} style={{ textAlign: 'center' }}>
            <Space style={{ float: 'right', marginTop: '10px' }}>
              <SearchBar
                setData={setDataOpportunity}
                width={400}
                placeholder='Search for name, contact name or sales person'
                getApi={searchMethod}
              />
            </Space>
          </Col>
        </Row>
      </div>
    </>
  )
}
