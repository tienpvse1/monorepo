import { MyForm } from '@components/form/my-form'
import { Button, Col, Form, Row, Space } from 'antd'
import { EditButtonHover } from '@components/page-details/edit-button-hover';
import { ContactInfoDetails } from './contact-info-details';
import { AddressInfoDetails } from './address-info-details';
import { ContactInfoForm } from './contact-info-form';
import { useToggle } from '@hooks/useToggle';
import { IContact } from '@modules/contact/entity/contact.entity';
import moment from 'moment';
import { AddressInfoForm } from './address-info-form';
import { dateFormat } from '@constance/date-format';
const { CRUD_AT, BIRTH } = dateFormat;
import { useUpdateContact } from '@modules/contact/mutation/contact.patch';
import { useQueryClient } from 'react-query';
import { QUERY_CONTACTS_BY_ID } from '@modules/contact/query/contact.get';
import { message } from 'antd';

interface ContactDetailsProps {
  contact: IContact;
}
export const ContactDetails: React.FC<ContactDetailsProps> = ({ contact }) => {

  const [isEditingForm1, toggleEditForm1] = useToggle();
  const [isEditingForm2, toggleEditForm2] = useToggle();
  const [form] = Form.useForm<IContact>();

  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries(QUERY_CONTACTS_BY_ID);
    message.success('Save successfully !')
  }
  const { mutate } = useUpdateContact(onSuccess);

  const handleToggleEditForm1 = () => {
    toggleEditForm1();
    form.setFieldsValue({
      name: contact.name,
      email: contact.email,
      birth: contact.birth ? moment(contact.birth) : '',
      title: contact.title,
      phone: contact.phone,
      mobile: contact.mobile,
      prefixMobile: '84'
    })
  }

  const handleToggleEditForm2 = () => {
    toggleEditForm2();
    form.setFieldsValue({
      addresses: { ...contact.addresses[0] },
      postalCode: contact.postalCode,
      jobPosition: contact.jobPosition,
      website: contact.website,
      taxId: contact.taxId
    })
  }

  const handleSubmitForm1 = async () => {
    try {
      const value = await form.validateFields();
      mutate({
        ...value,
        birth: value.birth ? value.birth.format(BIRTH) : '',
        id: contact.id
      });

      toggleEditForm1();
    } catch (error) {
      return;
    }
  }

  const handleSubmitForm2 = async () => {
    try {
      const value = await form.validateFields();
      mutate({
        ...value,
        addresses: [value.addresses],
        id: contact.id
      });
      toggleEditForm2();
    } catch (error) {
      return;
    }
  }

  return (
    <>
      <Form form={form} layout='vertical'>
        {isEditingForm1 ?
          <Row gutter={[24, 0]}>
            <ContactInfoForm />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space >
                <Button onClick={() => handleSubmitForm1()} type='primary'>Save</Button>
                <Button onClick={toggleEditForm1}>Cancel</Button>
              </Space>
            </Col>
          </Row> :
          <EditButtonHover toggleEditForm={handleToggleEditForm1}>
            <ContactInfoDetails contact={contact} />
          </EditButtonHover>
        }

        <Row className="title-form-content">
          Address Information
        </Row>
        {isEditingForm2 ?
          <Row gutter={[24, 0]}>
            <AddressInfoForm />
            <Col style={{ textAlign: 'right' }} span={24}>
              <Space >
                <Button onClick={() => handleSubmitForm2()} type='primary'>Save</Button>
                <Button onClick={toggleEditForm2}>Cancel</Button>
              </Space>
            </Col>
          </Row> :
          <EditButtonHover toggleEditForm={handleToggleEditForm2}>
            <AddressInfoDetails contact={contact} />
          </EditButtonHover>
        }

        <Row className="title-form-content">
          System Information
        </Row>
        <Row>
          <Col span={12}>
            <MyForm label="Created At">
              {moment(contact.createdAt).format(CRUD_AT)}
            </MyForm>
          </Col>
          <Col span={12}>
            <MyForm label="Last Modified At">
              {moment(contact.updatedAt).format(CRUD_AT)}
            </MyForm>
          </Col>
        </Row>
      </Form>
    </>
  )
}
