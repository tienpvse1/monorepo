import { Col, Row } from 'antd';
import { MyForm } from '@components/form/my-form';
import { ICompany } from '@modules/company/entity/company.entity';
import { TypeOfSource } from './type-of-source';

interface CompanyInfoDetailsProps {
  company: ICompany
}

export const CompanyInfoDetails: React.FC<CompanyInfoDetailsProps> = ({
  company
}) => {
  return (
    <>
      <Row>
        <Col span={12}>
          <MyForm label="Name">
            {company.name}
          </MyForm>
          <MyForm label="Email">
            {company.email}
          </MyForm>
          <MyForm label="Foundation Date">
            {company?.foundationDate}
          </MyForm>
        </Col>
        <Col span={12}>
          <MyForm label="Phone Number">
            {company.mobile}
          </MyForm>
          <MyForm label="Source Info">
            <TypeOfSource type={company?.source} />
          </MyForm>
        </Col>
      </Row>
    </>
  )
}
