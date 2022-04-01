import { MyForm } from '@components/form/my-form';
import { dateFormat } from '@constance/date-format';
import { IContact } from '@modules/contact/entity/contact.entity';
import { Col, Row } from 'antd';
import moment from 'moment';
const { BIRTH } = dateFormat;
import { Typography } from 'antd';
const { Paragraph } = Typography;

interface ContactInfoDetailsProps {
  contact: IContact;
}

export const ContactInfoDetails: React.FC<ContactInfoDetailsProps> = ({
  contact,
}) => {
  return (
    <>
      <Row >
        <Col style={{ height: '100%' }} span={12}>
          <MyForm label='Name'>{contact.name}</MyForm>
          <MyForm label='Email'>{contact.email}</MyForm>
          <MyForm
            customStyle={{ height: '100%' }}
            label='Address'
          >
            <Paragraph style={{ marginBottom: 0 }}>
              {contact.address || '.'}
            </Paragraph>
          </MyForm>
          <MyForm label='Job Position'>{contact.jobPosition}</MyForm>
        </Col>
        <Col span={12}>
          <MyForm label='Phone'>{contact.phone}</MyForm>
          <MyForm label='Company'>{contact.company?.name}</MyForm>
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
