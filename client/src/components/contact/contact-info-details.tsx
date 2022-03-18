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
          <MyForm label='Name'>{contact.name}</MyForm>
          <MyForm label='Email'>{contact.email}</MyForm>
          <div className='address-form-details'>
            <label className='my-form-label'>Address</label>
            <div className='my-form-content'>
                  
            </div>
          </div>
        </Col>
        <Col span={12}>
          <MyForm label='Phone'>{contact.phone}</MyForm>
          <MyForm label='Company'>{contact.company}</MyForm>
          <MyForm label='Birth'>
            {contact.birth
              ? moment(contact.birth).format(BIRTH).toString()
              : ''}
          </MyForm>
        </Col>
      </Row>
    </>
  );
};
