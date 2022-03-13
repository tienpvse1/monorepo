import { Col, Row } from 'antd'
import { MyForm } from '@components/form/my-form';

export const CompanyAddressDetails = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <MyForm label="Address">
            Company address
          </MyForm>
          <MyForm label="City">
            Company city
          </MyForm>
          <MyForm label="Postal Code">
            7000000
          </MyForm>
          <MyForm label="Country">
            Viet Nam
          </MyForm>
        </Col>
        <Col span={12}>
          <MyForm label='Website'>
            company.com
          </MyForm>
          <MyForm label='TaxID'>
            0123456789
          </MyForm>
        </Col>
      </Row>
    </>
  )
}
