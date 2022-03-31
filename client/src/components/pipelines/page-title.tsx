import { FilterOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { WrapperRowTitle } from '@components/layout/title-pages/wrapper-row-title';
import { SearchBar } from '@components/search-bar';
import { Button, Col, Row, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

interface PageTitlePipelineProps {
  setModalCreateStage: () => void;
  isRoleAdmin: boolean;
}

export const PageTitlePipeline: React.FC<PageTitlePipelineProps> = ({
  setModalCreateStage,
  isRoleAdmin
}) => {

  const navigate = useNavigate();

  return (
    <>
      <WrapperRowTitle
        className='wrapper-title-page-2'
        title='Pipeline'
        titleSize='27px'
        children={
          <SearchBar placeholder='Search for id, name or phone number' />
        }
      />
      <Row>
        <Col
          span={24}
          className='wrapper-title-page-2'
          style={isRoleAdmin ? {} : { flexDirection: 'row-reverse' }}
        >
          {isRoleAdmin &&
            <Button
              onClick={setModalCreateStage}
              className='button-create-task-pipeline'
              icon={<PlusOutlined />}
              type='primary'
            >
              Create Stage
            </Button>}
          <div>
            <Space>
              <Select
                placeholder='Group by'
                style={{ width: 120 }}
              >
                <Option value='salesPerson'>Sales Person</Option>
                <Option value='salesTeam'>Sales Team</Option>
              </Select>
              <Button className='button-filter-pipeline'>
                <FilterOutlined />
              </Button>
              <Button
                onClick={() => navigate('opportunities-lost') }
                type='primary'
                icon={<DeleteOutlined />}
                className='button-more-pipeline'
              >
                Lost Opportunities
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};
