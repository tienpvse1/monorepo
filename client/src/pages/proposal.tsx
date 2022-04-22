import { PageHeaderProposal } from "@components/proposal/page-header"
import { Col, Row } from "antd"
import { ListCourseEndDate } from "@components/proposal/list-course-end-date";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ListCourseProposal } from "@components/proposal/list-course-proposal";
import { useToggle } from "@hooks/useToggle";
const Proposal = () => {
  const [flag, reload] = useToggle();

  const handleProposal = () => {
    reload();
  }

  return (
    <>
      <div className='container-content-details-page'>
        <PageHeaderProposal />
        <Row gutter={[24, 0]}>
          <Col span={10}>
            <ListCourseEndDate mountProposal={handleProposal} />
          </Col>

          <Col span={4} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <div>
              <ArrowRightOutlined style={{ fontSize: '46px' }} />
            </div>
          </Col>
          <Col span={10}>
            <ListCourseProposal flag={flag} />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Proposal