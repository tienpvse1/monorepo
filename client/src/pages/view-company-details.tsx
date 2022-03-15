import { SmileOutlined } from "@ant-design/icons";
import { CompanyTitleDetails } from "@components/company/company-title-details";
import { Col, Divider, Row, Timeline } from "antd";
import { CompanyInfoTabs } from '@components/company/company-info-tabs';

const ViewCompanyDetails = () => {
  return (
    <>
      <CompanyTitleDetails />
      <Row gutter={[0, 0]}>
        <Col span={16}>
          <div className="container-content-details-page">
            <CompanyInfoTabs />
          </div>
        </Col>
        <Col span={8}>
          <div className="container-page">
            <span style={{ fontSize: '16px' }}>History Logs</span>
            <Divider></Divider>
            {/* // TODO: this Timeline still hard code */}
            <Timeline>
              <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item color="#00CCFF" dot={<SmileOutlined />}>
                <p>Custom color testing</p>
              </Timeline.Item>
            </Timeline>
            <Divider plain orientation='center'>
              Today
            </Divider>
            <Timeline mode='left'>
              <Timeline.Item label=''>
                CRM BOT: activated account at 6:45PM
              </Timeline.Item>
            </Timeline>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ViewCompanyDetails;