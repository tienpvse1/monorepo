import { MyForm } from "@components/form/my-form";
import { EditButtonHover } from "@components/page-details/edit-button-hover";
import { useToggle } from "@hooks/useToggle";
import { Button, Col, Form, Row, Space } from "antd"
import { CompanyInfoForm } from "./company-info-form";
import { CompanyInfoDetails } from "./company-info-details";
import { CompanyAddressForm } from "./company-address-form";
import { CompanyAddressDetails } from "./company-address-details";
import { CompanyAdditionalForm } from "./company-additional-form";
export const CompanyDetails = () => {
  const [isEditingForm1, toggleEditForm1] = useToggle();
  const [isEditingForm2, toggleEditForm2] = useToggle();
  const [isEditingForm3, toggleEditForm3] = useToggle();
  const [form] = Form.useForm<any>();

  const handleToggleEditForm1 = () => {
    toggleEditForm1();

  };

  const handleToggleEditForm2 = () => {
    toggleEditForm2();

  };
  const handleToggleEditForm3 = () => {
    toggleEditForm3();

  };

  const handleSubmitForm1 = async () => {
    try {
      // const value = await form.validateFields();


      toggleEditForm1();
    } catch (error) {
      return;
    }
  };

  const handleSubmitForm2 = async () => {
    try {
      // const value = await form.validateFields();

      toggleEditForm2();
    } catch (error) {
      return;
    }
  };
  const handleSubmitForm3 = async () => {
    try {
      // const value = await form.validateFields();

      toggleEditForm3();
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <Form form={form} layout='vertical'>
        {isEditingForm1 ? (
          <Row gutter={[24, 0]}>
            <CompanyInfoForm />
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
            <CompanyInfoDetails />
          </EditButtonHover>
        )}

        <Row className='title-form-content'>Address Information</Row>
        {isEditingForm2 ? (
          <Row gutter={[24, 0]}>
            <CompanyAddressForm />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space>
                <Button onClick={() => handleSubmitForm2()} type='primary'>
                  Save
                </Button>
                <Button onClick={toggleEditForm2}>Cancel</Button>
              </Space>
            </Col>
          </Row>
        ) : (
          <EditButtonHover toggleEditForm={handleToggleEditForm2}>
            <CompanyAddressDetails />
          </EditButtonHover>
        )}
        <Row className='title-form-content'>Addition Information</Row>
        {isEditingForm3 ? (
          <Row gutter={[24, 0]}>
            <CompanyAdditionalForm />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space>
                <Button onClick={() => handleSubmitForm3()} type='primary'>
                  Save
                </Button>
                <Button onClick={toggleEditForm3}>Cancel</Button>
              </Space>
            </Col>
          </Row>) : (
          <EditButtonHover toggleEditForm={handleToggleEditForm3}>
            <Row>
              <Col span={24}>
                <MyForm label='Description'>
                  This is description company
                </MyForm>
              </Col>
            </Row>
          </EditButtonHover>
        )}

        <Row className='title-form-content'>System Information</Row>
        <Row>
          <Col span={12}>
            <MyForm label='Created At'>
              {/* {moment(contact.createdAt).format(CRUD_AT)} */}
              2022-03-11, 9:59 pm
            </MyForm>
          </Col>
          <Col span={12}>
            <MyForm label='Last Modified At'>
              {/* {moment(contact.updatedAt).format(CRUD_AT)} */}
              2022-03-11, 9:59 pm
            </MyForm>
          </Col>
        </Row>
      </Form>
    </>
  )
}
