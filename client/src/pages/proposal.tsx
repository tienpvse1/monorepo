import { PageHeaderProposal } from "@components/proposal/page-header"
import { Col, Form, Row } from "antd"
import { ListCourseEndDate } from "@components/proposal/list-course-end-date";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ListCourseProposal } from "@components/proposal/list-course-proposal";
import { useToggle } from "@hooks/useToggle";
import { CreateModal } from "@components/modal/create-modal";
import { CreateOpportunityForm } from "@components/opportunity/create-opportunity-form";
import { SubmitFormCreateOpportunity } from "@components/opportunity/opportunity-table";

const Proposal = () => {
  const [flag, reload] = useToggle();
  const [form] = Form.useForm<SubmitFormCreateOpportunity>();
  const [isOpenModal, toggleCreateModal] = useToggle();

  const handleProposal = () => {
    reload();
  }

  console.log("getF:", form.getFieldsValue(['contactId', 'companyName', 'courseId']));


  const handleCreateOpportunity = async () => {

  }

  return (
    <>
      <div className='container-content-details-page'>
        <PageHeaderProposal />
        <Row gutter={[24, 0]}>
          <Col span={10}>
            <ListCourseEndDate mountProposal={handleProposal} form={form} />
          </Col>
          <Col span={4} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <div>
              <ArrowRightOutlined style={{ fontSize: '46px' }} />
            </div>
          </Col>
          <Col span={10}>
            <ListCourseProposal flag={flag} toggleCreateModal={toggleCreateModal} form={form} />
          </Col>
        </Row>
      </div>
      <CreateModal
        destroyOnClose={true}
        title='New Opportunity'
        hasSubmitMethod={handleCreateOpportunity}
        isOpenModal={isOpenModal}
        toggleCreateModal={toggleCreateModal}
        hasForm={true}
      >
        <Form
          form={form}
          layout='vertical'
        >
          <CreateOpportunityForm
            form={form}
            dataSetField={form.getFieldsValue(['contactId', 'companyName', 'courseId'])}
          />
        </Form>
      </CreateModal>
    </>
  )
}

export default Proposal