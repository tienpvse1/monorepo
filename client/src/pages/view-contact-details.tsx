import { FileTextOutlined, SmileOutlined } from "@ant-design/icons";
import { ContactDetails } from "@components/contact/contact-details";
import { PageDetailsTitle } from "@components/page-details/page-details-title"
import { useQueryContactsById } from "@modules/contact/query/contact.get";
import { Alert, Col, Divider, Row, Tabs, Timeline } from "antd"
const { TabPane } = Tabs;
import { useParams } from 'react-router-dom'

const ViewContactDetails = () => {
  const params = useParams();
  const { data } = useQueryContactsById(params.id);    
  console.log(data);
  
  return (
    <>
      {data ?
        <>
          <PageDetailsTitle contact={data} />
          <Row gutter={[0, 0]}>
            <Col span={16}>
              <div className="container-content-details-page">
                <Tabs size="large" defaultActiveKey="1" >
                  <TabPane tab="Details" key="1">
                    <ContactDetails contact={data} />
                  </TabPane>
                  <TabPane tab="Opportunities" key="2">
                    This is opportunities of contact will be show in table
                  </TabPane>
                  <TabPane tab="Notes" key="3">
                    <Alert
                      message="Internal Notes"
                      showIcon
                      icon={<FileTextOutlined />}
                      description={`${data.internalNotes}`}
                      type="warning"
                    />
                  </TabPane>
                </Tabs>
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
        </> :
        // TODO: this skeleton still hard code
        <div>this is skeleton....</div>
      }
    </>
  )
}

export default ViewContactDetails