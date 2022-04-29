import { Button, Col, Form, message, Row, Space } from "antd";
import { MyForm } from '@components/form/my-form';
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { EditButtonHover } from '@components/page-details/edit-button-hover';
import { OpportunityInfoDetails } from "./opportunity-info-details";
import { useToggle } from "@hooks/useToggle";
import { OpportunityInfoForm } from "./opportunity-info-form";
import moment from "moment";
import { dateFormat } from "@constance/date-format";
import { useUpdatePipelineItem } from "@modules/pipeline-items/mutation/pipeline-items.update";
import { OpportunityInfoTeam } from "./opportunity-info-team";
import { OpportunityTeamForm } from "./opportunity-team-form";
import { useQueryClient } from "react-query";
import { GET_PIPELINE_ITEM_BY_ID } from "@modules/pipeline-items/query/pipeline-item.get";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { PUBLIC_USER_INFO } from "@constance/cookie";
import { useReassignAccount } from "@modules/pipeline-items/mutation/pipeline-item.patch";
import { OpportunityAdditionalForm } from "./opportunity-additional-form";
import { useSendEmail } from "@modules/email/mutate/email.post";
const { CRUD_AT, DEFAULT } = dateFormat;
import numberSeparator from "number-separator";

interface OpportunityDetailsProps {
  data: IPipelineItem
}

export const OpportunityDetails: React.FC<OpportunityDetailsProps> = ({ data }) => {
  const [isEditingForm1, toggleEditForm1] = useToggle();
  const [isEditingForm2, toggleEditForm2] = useToggle();
  const [isEditingForm3, toggleEditForm3] = useToggle();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const params = useParams();
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);
  const isRoleManager = () => {
    return public_user_info.role.name === 'sale_manager';
  }

  const { mutate: updateOpportunity } = useUpdatePipelineItem();
  const { mutate: reassignAccount } = useReassignAccount();
  const onError = () => {
    message.error('Can not send email');
  }
  const { mutate: sendEmail } = useSendEmail(onError);

  const handleToggleEditForm1 = () => {
    toggleEditForm1();
    form.setFieldsValue({
      name: data.name,
      expectedClosing: data.expectedClosing ? moment(data.expectedClosing) : '',
      expectedRevenue: data.expectedRevenue,
      contactId: data.contact.id,
      companyName: data.contact.company.id,
      priority: data.priority,
      courseId: data.opportunityRevenue.course?.id,
      quantity: data.opportunityRevenue.quantity,
      discountCode: Math.abs(data.expectedRevenue - (data.opportunityRevenue.course.price * data.opportunityRevenue.quantity)) / (data.opportunityRevenue.course.price * data.opportunityRevenue.quantity)
    });
  };
  const handleToggleEditForm2 = () => {
    toggleEditForm2();
    form.setFieldsValue({
      description: data.description
    });
  };
  const handleToggleEditForm3 = () => {
    toggleEditForm3();
    form.setFieldsValue({
      saleTeam: data.account.team.id,
      salePerson: data.account.id
    });
  };

  const handleSubmitForm1 = async () => {
    try {
      const value = await form.validateFields();
      console.log("record:", {
        id: data.id,
        name: value.name,
        priority: value.priority,
        contactId: value.contactId,
        //@ts-ignore
        columnId: data.pipelineColumn.id,
        expectedRevenue: value.expectedRevenue ? Number(value.expectedRevenue) * value.quantity : 0,
        expectedClosing: value.expectedClosing ? value.expectedClosing.format(DEFAULT) : '',
        opportunityRevenue: {
          id: data.opportunityRevenue.id,
          courseId: value.courseId.toString(),
          quantity: value.quantity
        }
      });

      updateOpportunity({
        id: data.id,
        name: value.name,
        priority: value.priority,
        contactId: value.contactId,
        //@ts-ignore
        columnId: data.pipelineColumn.id,
        expectedRevenue: value.expectedRevenue ? Number(value.expectedRevenue) * value.quantity : 0,
        expectedClosing: value.expectedClosing ? value.expectedClosing.format(DEFAULT) : '',
        opportunityRevenue: {
          id: data.opportunityRevenue.id,
          courseId: value.courseId.toString(),
          quantity: value.quantity
        }
      }, {
        onSuccess: () => {
          message.success('Saved successfully !');
          // console.log("valuePO:", value);

          // console.log('a:',value.contactName, value.contactEmail, value.contactPhone, value.companyName, value.companyEmail, value.companyCity, value.courseName, value.quantity, value.discountCode, value.coursePrice, value.expectedRevenue);

          //     sendEmail({
          //       subject: 'VJAA CRM - Confirm Order Information',
          //       to: [{ email: data.contact.email, isTag: false }],
          //       value: `
          //       <div class="invoice-box" style="
          //   max-width: 800px;
          //   margin: auto;
          //   padding: 30px;
          //   border: 1px solid #eee; 
          //   box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          //   font-size: 16px;
          //   line-height: 24px;
          //   font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          //   color: #555;
          // ">
          //     <h1>Order Information:</h1>
          //     <table style="
          //       width: 100%;
          //        line-height: inherit;
          //        text-align: left;
          //        border-collapse: collapse;
          //      ">
          //         <tr class="information">
          //             <td colspan="2" style="padding: 5px; vertical-align: top; padding-bottom: 40px;">
          //                 <table style="
          //                  width: 100%;
          //                  line-height: inherit;
          //                  text-align: left;
          //                  border-collapse: collapse;
          //                ">
          //                     <tr>
          //                         <td>
          //                             Company name: ${data.contact.company.name} <br /> Email company: ${data.contact.company.email} <br /> City: ${data.contact.company.city.admin_name}
          //                         </td>

          //                         <td>
          //                             Contact name: ${data.contact.name} <br /> Email contact: ${data.contact.email}<br /> Phone: ${data.contact.phone}
          //                         </td>
          //                     </tr>
          //                 </table>
          //             </td>
          //         </tr>

          //         <tr class="heading" style=" background: #eee;
          //         border-bottom: 1px solid #ddd;
          //         font-weight: bold;">
          //             <td style="padding: 5px; vertical-align: top; text-align: left;">Item</td>
          //             <td style="padding: 5px; vertical-align: top;">Quantity</td>
          //             <td style="padding: 5px; vertical-align: top; text-align: center;">Discount (%)</td>
          //             <td style="padding: 5px; vertical-align: top; text-align: right;">Price</td>
          //         </tr>

          //         <tr class="item" style="border-bottom: 1px solid #eee;">
          //             <td style="padding: 5px; vertical-align: top; text-align: left; width: 50%;">${value.courseName}</td>
          //             <td style="padding: 5px; vertical-align: top;">${value.quantity}</td>
          //             <td style="padding: 5px; vertical-align: top; text-align: center;">${value.discountCode * 100}%</td>
          //             <td style="padding: 5px; vertical-align: top; text-align: right;">${numberSeparator(value.coursePrice, '.')}vnd</td>
          //         </tr>

          //         <tr class="total" style=" border-top: 2px solid #eee;
          //         font-weight: bold;">
          //             <td style="padding: 5px; vertical-align: top;"></td>
          //             <td style="padding: 5px; vertical-align: top;"></td>
          //             <td style="padding: 5px; vertical-align: top;"></td>
          //             <td style="padding: 5px; vertical-align: top; text-align: right;">Total: ${numberSeparator(value.expectedRevenue, '.')}vnd</td>
          //         </tr>
          //     </table>
          // </div>
          //       `
          //     }, {
          //       onSuccess: () => {
          //         message.success('Created successfully !')
          //       }
          //     })
          toggleEditForm1();
        }
      })

    } catch (error) {
      return;
    }
  };

  const handleSubmitForm2 = async () => {
    try {
      const value = await form.validateFields();
      updateOpportunity({
        id: data.id,
        ...value
      }, {
        onSuccess: () => {
          message.success('Saved successfully !');
          toggleEditForm2();
        }
      })

    } catch (error) {
      return;
    }
  };

  const handleSubmitForm3 = async () => {
    try {
      const { salePerson } = await form.validateFields();
      reassignAccount({
        id: data.id,
        accountId: salePerson
      }, {
        onSuccess: () => {
          message.success('Saved successfully !');
          queryClient.refetchQueries([GET_PIPELINE_ITEM_BY_ID, params.id]);
          toggleEditForm3();
        }
      })

    } catch (error) {
      return;
    }
  };
  return (
    <>
      <Form form={form} layout='vertical'>
        {isEditingForm1 ? (
          <Row gutter={[24, 0]}>
            <OpportunityInfoForm
              disabledCompany={true}
              disabledContact={true}
              contact={data.contact}
              showStageInput={false}
              courseId={data.opportunityRevenue.course?.id}
              quantityOrder={data.opportunityRevenue.quantity}
              expectedRevenue={data.expectedRevenue}
              form={form}
            />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space>
                <Button onClick={() => handleSubmitForm1()} type='primary'>
                  Save
                </Button>
                <Button onClick={toggleEditForm1}>Cancel</Button>
              </Space>
            </Col>
          </Row>
        ) : (
          <EditButtonHover
            disabled={data.pipelineColumn.isWon || data.isLose && true}
            toggleEditForm={handleToggleEditForm1}
          >
            <OpportunityInfoDetails opportunity={data} />
          </EditButtonHover>
        )}

        <Row className='title-form-content'>Additional Information</Row>
        {isEditingForm2 ? (
          <Row gutter={[24, 0]}>
            <OpportunityAdditionalForm />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space>
                <Button onClick={() => handleSubmitForm2()} type='primary'>
                  Save
                </Button>
                <Button onClick={toggleEditForm2}>Cancel</Button>
              </Space>
            </Col>
          </Row>) : (
          <EditButtonHover
            disabled={data.pipelineColumn.isWon || data.isLose && true}
            toggleEditForm={handleToggleEditForm2}
          >
            <Row>
              <Col span={24}>
                <MyForm label='Description'>
                  {data.description}
                </MyForm>
              </Col>
            </Row>
          </EditButtonHover>
        )}

        <Row className='title-form-content'>Team Information</Row>
        {isEditingForm3 ? (
          <Row gutter={[24, 0]}>
            <OpportunityTeamForm team={data.account.team} />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space>
                <Button onClick={() => handleSubmitForm3()} type='primary'>
                  Save
                </Button>
                <Button onClick={toggleEditForm3}>Cancel</Button>
              </Space>
            </Col>
          </Row>) : (
          <EditButtonHover
            disabled={!isRoleManager() || data.pipelineColumn.isWon || data.isLose}
            toggleEditForm={handleToggleEditForm3}
          >
            <OpportunityInfoTeam opportunity={data} />
          </EditButtonHover>
        )}

        <Row className='title-form-content'>System Information</Row>
        <Row>
          <Col span={12}>
            <MyForm label='Created At'>
              {moment(data.createdAt).format(CRUD_AT)}
            </MyForm>
          </Col>
          <Col span={12}>
            <MyForm label='Last Modified At'>
              {moment(data.updatedAt).format(CRUD_AT)}
            </MyForm>
          </Col>
        </Row>
      </Form>
    </>
  );
};
