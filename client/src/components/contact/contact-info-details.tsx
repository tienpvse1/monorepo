import { MyForm } from '@components/form/my-form';
import { dateFormat } from '@constance/date-format';
import { IContact } from '@modules/contact/entity/contact.entity';
import { Col, Row } from 'antd';
import moment from 'moment';
const { BIRTH } = dateFormat;

interface ContactInfoDetailsProps {
  contact: IContact;
}

export const ContactInfoDetails: React.FC<ContactInfoDetailsProps> = ({
  contact,
}) => {
  return (
    <>
      <Row>
        <Col span={12}>
          <MyForm label='Name'>name</MyForm>
          <MyForm label='Email'>email</MyForm>
          <MyForm label='Company'></MyForm>
          <MyForm label='Birth'>
            {/* {contact.birth
              ? moment(contact.birth).format(BIRTH).toString()
              : ''} */}
              birth
          </MyForm>
        </Col>
        <Col span={12}>
          <MyForm label='Phone'>phone</MyForm>
          <MyForm label='Mobile'>mobile</MyForm>
          <MyForm label='Type'></MyForm>
        </Col>
      </Row>
    </>
  );
};
