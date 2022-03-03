import { MyForm } from '@components/form/my-form'
import { Button, Col, Form, Row, Space } from 'antd'
import { ButtonEditHover } from '@components/page-details/button-edit-hover';
import { ContactInfoDetails } from './contact-info-details';
import { AddressInfoDetails } from './address-info-details';
import { ContactInfoForm } from './contact-info-form';
import { useToggle } from '@hooks/useToggle';
import { AddressInfoForm } from './Address-info-form';
import { IContact } from '@modules/contact/entity/contact.entity';
import moment from 'moment';

interface DetailsContactProps {
  contact: IContact;
}
export const DetailsContact: React.FC<DetailsContactProps> = ({ contact }) => {

  const [isEditingForm1, toggleEditForm1] = useToggle();
  const [isEditingForm2, toggleEditForm2] = useToggle();
  const [form] = Form.useForm<IContact>();

  const handleToggleEditForm1 = () => {
    toggleEditForm1();
    form.setFieldsValue({
      name: contact.name,
      email: contact.email,
      birth: moment(contact.birth),
      title: contact.title,
      phone: contact.phone,
      mobile: contact.mobile
    })
  }

  const handleToggleEditForm2 = () => {
    toggleEditForm2();

  }

  const handleSubmit = (value) => {
    console.log(value);
  }

  return (
    <>
      <Form form={form} onFinish={handleSubmit} layout='vertical'>
        {isEditingForm1 ?
          <Row gutter={[24, 0]}>
            <ContactInfoForm />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space >
                <Button htmlType='submit' type='primary'>Save</Button>
                <Button onClick={toggleEditForm1}>Cancel</Button>
              </Space>
            </Col>
          </Row> :
          <ButtonEditHover toggleEditForm={handleToggleEditForm1}>
            <ContactInfoDetails contact={contact} />
          </ButtonEditHover>
        }

        <Row className="title-form-content">
          Address Information
        </Row>
        {isEditingForm2 ?
          <Row gutter={[24, 0]}>
            <AddressInfoForm />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space >
                <Button htmlType='submit' type='primary'>Save</Button>
                <Button onClick={toggleEditForm2}>Cancel</Button>
              </Space>
            </Col>
          </Row> :
          <ButtonEditHover toggleEditForm={handleToggleEditForm2}>
            <AddressInfoDetails />
          </ButtonEditHover>
        }

        <Row className="title-form-content">
          System Information
        </Row>
        <Row>
          <Col span={12}>
            <MyForm label="Created At">
              {/* 2/25/2022, 7:14 AM */}
              {contact.createdAt}
            </MyForm>
          </Col>
          <Col span={12}>
            <MyForm label="Last Modified At">
              2/25/2022, 7:14 AM
              {/* {contact.updatedAt} */}
            </MyForm>
          </Col>
        </Row>
      </Form>
    </>
  )
}
