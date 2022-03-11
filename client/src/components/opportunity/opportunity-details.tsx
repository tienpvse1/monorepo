import { Button, Col, Form, message, Row, Space } from "antd";
import { MyForm } from '@components/form/my-form';
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { EditButtonHover } from '@components/page-details/edit-button-hover';
import { OpportunityInfoDetails } from "./opportunity-info-details";
import { useToggle } from "@hooks/useToggle";
import { OpportunityInfoForm } from "./opportunity-info-form";
import moment from "moment";
import { dateFormat } from "@constance/date-format";
import { OpportunityAdditionalForm } from "./opportunity-additional-form";
import { useUpdatePipelineItem } from "@modules/pipeline-items/mutation/pipeline-items.update";
const { CRUD_AT } = dateFormat;

interface OpportunityDetailsProps {
  data: IPipelineItem
}

export const OpportunityDetails: React.FC<OpportunityDetailsProps> = ({ data }) => {
  const [isEditingForm1, toggleEditForm1] = useToggle();
  const [isEditingForm2, toggleEditForm2] = useToggle();
  const { mutate: updateOpportunity } = useUpdatePipelineItem();

  const [form] = Form.useForm();

  const handleToggleEditForm1 = () => {
    toggleEditForm1();
    form.setFieldsValue({
      name: data.name,
      expectedClosing: data.expectedClosing ? moment(data.expectedClosing) : '',
      expectedRevenue: data.expectedRevenue,
      contactId: data.contact.id,
      salePerson: data.account.id
    });
  };
  const handleToggleEditForm2 = () => {
    toggleEditForm2();
    form.setFieldsValue({
      internalDescription: data.internalDescription
    });
  };

  const handleSubmitForm1 = async () => {
    try {
      const value = await form.validateFields();
      console.log({
        id: data.id,
        contactId: value.contactId,
        name: value.name,
        opportunityRevenue: {
          productId: value.productId,
          quantity: value.quantity
        }
      });

      // updateOpportunity({
      //   id: data.id,
      //   contactId: value.contactId,
      //   name: value.name,
      //   opportunityRevenue: {
      //     productId: value.productId,
      //     quantity: value.quantity
      //   }
      // }, {
      //   onSuccess: () => {
      //     message.success('Saved successfully !');
      //     toggleEditForm1();
      //   }
      // })

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
  return (
    <>
      <Form form={form} layout='vertical'>
        {isEditingForm1 ? (
          <Row gutter={[24, 0]}>
            <OpportunityInfoForm showStageInput={false} />
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
          <EditButtonHover toggleEditForm={handleToggleEditForm1}>
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
          <EditButtonHover toggleEditForm={handleToggleEditForm2}>
            <Row>
              <Col span={24}>
                <MyForm label='Description'>
                  {data.internalDescription}
                </MyForm>
              </Col>
            </Row>
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
