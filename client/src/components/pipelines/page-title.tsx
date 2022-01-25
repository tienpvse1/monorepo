import { FilterOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { WrapperRowTitle } from '@components/layout/title-pages/wrapper-row-title';
import { SearchBar } from '@components/search-bar';
import { Button, Col, Row, Select } from 'antd';
const { Option } = Select;

const handleChange = (value: any) => {
  console.log(`selected ${value}`);
}

export const PageTitlePipeline = () => {
  return (
    <>
      <WrapperRowTitle
        className="wrapper-title-page-2"
        title="Agreements"
        titleSize="27px"
        children={<SearchBar placeholder="Search for id, name or phone number" />}
      />
      <Row>
        <Col className="wrapper-title-page-2" span={24} >
          <Button className="button-create-task-pipeline" icon={<PlusOutlined />} type='primary'>Create Task</Button>
          <div style={{ display: 'flex' }}>
            <Select placeholder="Group by" style={{ width: 120, marginRight: '10px' }} onChange={handleChange}>
              <Option value="salesPerson">Sales Person</Option>
              <Option value="salesTeam">Sales Team</Option>
            </Select>
            <Button className="button-filter-pipeline"><FilterOutlined /></Button>
            <Button className="button-more-pipeline"><MoreOutlined /></Button>
          </div>
        </Col>
      </Row>
    </>
  );
};
