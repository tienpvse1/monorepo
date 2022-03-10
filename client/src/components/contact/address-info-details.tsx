import { MyForm } from '@components/form/my-form';
import { IContact } from '@modules/contact/entity/contact.entity';
import { Col, Row } from 'antd';

interface AddressInfoDetailsProps {
  contact: IContact;
}

export const AddressInfoDetails: React.FC<AddressInfoDetailsProps> = ({
  contact,
}) => {
  return (
    <>
      <Row>
        <Col span={12}>
          {/* <MyForm label="Address">
            {contact.addresses[0]?.address}
          </MyForm>
          <MyForm label="City">
            {contact.addresses[0]?.city}
          </MyForm>
          <MyForm label="Postal Code">
            {contact.postalCode}
          </MyForm>
          <MyForm label="Country">
            {contact.addresses[0]?.country}
          </MyForm> */}
        </Col>
        <Col span={12}>
          <MyForm label='Job Position'>{contact.jobPosition}</MyForm>
          <MyForm label='Website'>{contact.website}</MyForm>
          <MyForm label='TaxID'>{contact.taxId}</MyForm>
        </Col>
      </Row>
    </>
  );
};
