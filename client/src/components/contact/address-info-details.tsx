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
          <div className='address-form-details'>
            <label className='my-form-label'>Address</label>
            {/* <div className='my-form-content'>{contact.address}</div> */}
          </div>
          {/* <MyForm label='TaxID'>{contact.company.taxId}</MyForm>
          <MyForm label='Postal Code'>{contact.company.postalCode}</MyForm> */}
        </Col>
        <Col span={12}>
          {/* <MyForm label='Job Position'>{contact.jobPosition}</MyForm>
          <MyForm label='Website'>{contact.company.website}</MyForm> */}
        </Col>
      </Row>
    </>
  );
};
