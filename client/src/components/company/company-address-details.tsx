import { Col, Row } from 'antd'
import { MyForm } from '@components/form/my-form';
import { ICompany } from '@modules/company/entity/company.entity';

interface CompanyAddressDetailsProps {
  company: ICompany;
}

export const CompanyAddressDetails: React.FC<CompanyAddressDetailsProps> = ({
  company
}) => {
  return (
    <>
      <Row>
        <Col style={{ height: '100%' }} span={12}>
          <MyForm
            customStyle={{ height: '100%' }}
            label='Address'
          >
            {`${company.city.city || ''}, ${company.city.admin_name || ''}`}
          </MyForm>
          <MyForm label="Postal Code">
            {company.postalCode}
          </MyForm>
          <MyForm label="Country">
            {company.country}
          </MyForm>
        </Col>
        <Col span={12}>
          <MyForm label='Website'>
            {company.website}
          </MyForm>
          <MyForm label='TaxID'>
            {company.taxId}
          </MyForm>
        </Col>
      </Row>
    </>
  )
}
