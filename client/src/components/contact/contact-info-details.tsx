import { MyForm } from '@components/form/my-form'
import { dateFormat } from '@constance/date-format';
import { IContact } from '@modules/contact/entity/contact.entity'
import { Col, Row } from 'antd'
import moment from 'moment';
const { BIRTH } = dateFormat;

interface ContactInfoDetailsProps {
  contact: IContact;
}

export const ContactInfoDetails: React.FC<ContactInfoDetailsProps> = ({ contact }) => {
  return (
    <>
      <Row>
        <Col span={12}>
          <MyForm label="Name">
            {contact.name}
          </MyForm>
          <MyForm label="Email">
            {contact.email}
          </MyForm>
          <MyForm label="Birth">
            {moment(contact.birth).format(BIRTH).toString()}
          </MyForm>
          <MyForm label="Title">
            {contact.title}
          </MyForm>
        </Col>
        <Col span={12}>
          <MyForm label="Phone">
            {contact.phone}
          </MyForm>
          <MyForm label="Mobile">
            {contact.mobile}
          </MyForm>
          <MyForm label="Type">

          </MyForm>
        </Col>
      </Row>
    </>
  )
}
