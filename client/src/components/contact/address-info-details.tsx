import { MyForm } from '@components/form/my-form';
import { IContact } from '@modules/contact/entity/contact.entity';
import { Col, Row, Typography } from 'antd';
const { Paragraph } = Typography;

interface AddressInfoDetailsProps {
  contact: IContact;
}

export const AddressInfoDetails: React.FC<AddressInfoDetailsProps> = ({
  contact,
}) => {
  return (
    <Row>
      <Col span={24}>
        <MyForm
          customStyle={{ height: '100%' }}
          label='Address'
        >
          <Paragraph style={{ marginBottom: 0 }}>
            {contact.address || '.'}
          </Paragraph>
        </MyForm>
      </Col>
    </Row>
  );
};
