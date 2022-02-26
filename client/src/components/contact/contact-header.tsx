import { PlusOutlined, ImportOutlined } from '@ant-design/icons';
import { SearchBar } from '@components/search-bar';
import { Col, Row, Button, Space, Select } from 'antd';
const { Option } = Select;
import { useNavigate } from 'react-router-dom';
import { ButtonFilter } from './button-filter';

interface ContactHeaderProps {
  toggleModalCreate: () => void;
}

export const ContactHeader: React.FC<ContactHeaderProps> = ({ toggleModalCreate }) => {
  const navigate = useNavigate();
  const handleImportClick = () => {
    navigate('/import-contact');
  };

  return (
    <div style={{ padding: '10px' }}>
      <Row style={{ alignItems: 'center' }}>
        <Col span={12}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src='/contact.png'
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
              Contact
            </span>
          </div>
        </Col>
        <Col span={12}>
          <Space style={{ float: 'right' }}>
            <Button
              icon={<PlusOutlined />}
              className='button-ant-custom-style'
              type='primary'
              size='middle'
              onClick={toggleModalCreate}
            >
              New Contact
            </Button>
            <Button
              icon={<ImportOutlined />}
              className='button-ant-custom-style'
              type='primary'
              size='middle'
              onClick={handleImportClick}
            >
              Import
            </Button>
          </Space>
        </Col>
      </Row>
      <Row style={{ alignItems: 'center' }}>
        <Col span={6}>
          <span> Updated 17 minutes ago </span>
        </Col>
        <Col span={18} style={{ textAlign: 'center' }}>
          <Space style={{ float: 'right', marginTop: '10px' }}>
            <SearchBar width={300} placeholder='Search this list...' />
            <Select placeholder="Group by" style={{ width: 120 }}>
              <Option value="salesPerson">All contact</Option>
              <Option value="salesTeam">My contact</Option>
            </Select>
            <ButtonFilter />
          </Space>
        </Col>
      </Row>
    </div>
  );
};
