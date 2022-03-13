import { MyForm } from "@components/form/my-form";
import { EditButtonHover } from "@components/page-details/edit-button-hover";
import { useToggle } from "@hooks/useToggle";
import { Button, Col, Form, Row, Space } from "antd"

export const CompanyDetails = () => {
  const [isEditingForm1, toggleEditForm1] = useToggle();
  const [isEditingForm2, toggleEditForm2] = useToggle();
  const [form] = Form.useForm<any>();

  const handleToggleEditForm1 = () => {
    toggleEditForm1();
    
  };

  const handleToggleEditForm2 = () => {
    toggleEditForm2();
    
  };

  const handleSubmitForm1 = async () => {
    try {
      const value = await form.validateFields();
     

      toggleEditForm1();
    } catch (error) {
      return;
    }
  };

  const handleSubmitForm2 = async () => {
    try {
      const value = await form.validateFields();
     
      toggleEditForm2();
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <Form form={form} layout='vertical'>
        {isEditingForm1 ? (
          <Row gutter={[24, 0]}>
            {/* <ContactInfoForm /> */}
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
            {/* <ContactInfoDetails contact={contact} /> */}
          </EditButtonHover>
        )}

        <Row className='title-form-content'>Address Information</Row>
        {isEditingForm2 ? (
          <Row gutter={[24, 0]}>
            {/* <AddressInfoForm /> */}
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
            {/* <AddressInfoDetails contact={contact} /> */}
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
