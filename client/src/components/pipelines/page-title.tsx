import { FilterOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { WrapperRowTitle } from '@components/layout/title-pages/wrapper-row-title';
import { SearchBar } from '@components/search-bar';
import { Button, Col, Row, Select, Space } from 'antd';
const { Option } = Select;

interface PageTitlePipelineProps {
  setModalCreateStage: () => void;
}

export const PageTitlePipeline: React.FC<PageTitlePipelineProps> = ({
  setModalCreateStage,
}) => {
  const handleChange = (value: any) => { };
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
        <Col className='wrapper-title-page-2' span={24}>
          <Button
            onClick={setModalCreateStage}
            className='button-create-task-pipeline'
            icon={<PlusOutlined />}
            type='primary'
          >
            Create Stage
          </Button>
          <div style={{ display: 'flex' }}>
            <Space>
              <Select
                placeholder='Group by'
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value='salesPerson'>Sales Person</Option>
                <Option value='salesTeam'>Sales Team</Option>
              </Select>
              <Button className='button-filter-pipeline'>
                <FilterOutlined />
              </Button>
              <Button className='button-more-pipeline'>
                <MoreOutlined />
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};
