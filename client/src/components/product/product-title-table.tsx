import { PlusOutlined } from '@ant-design/icons'
import { ButtonFilter } from '@components/contact/button-filter';
import { SearchBar } from '@components/search-bar'
import { Button, Col, Row, Select, Space } from 'antd'
const { Option } = Select;

export const ProductTitleTable = () => {
  return (
    <>
      <div style={{ padding: '10px' }}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src='/box.png'
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
                Product
              </span>
            </div>
          </Col>
          <Col span={12}>
            <Space style={{ float: 'right' }}>
              <Button
                className='button-ant-custom-style'
                type='primary'
                size='middle'
              >
                <PlusOutlined /> New Product
              </Button>
            </Space>
          </Col>
        </Row>
        <Row style={{ alignItems: 'center' }}>
          <Col span={6}>
            <span> Updated 4 minutes ago </span>
          </Col>
          <Col span={18} style={{ textAlign: 'center' }}>
            <Space style={{ float: 'right', marginTop: '10px' }}>
              <SearchBar width={300} placeholder='Search this list...' />
              <Select placeholder="Group by" style={{ width: 120 }}>
                <Option value="salesPerson">All products</Option>
              </Select>
              <ButtonFilter />
            </Space>
          </Col>
        </Row>
      </div>
    </>
  )
}
