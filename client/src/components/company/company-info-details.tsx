import { Col, Row } from 'antd';
import { MyForm } from '@components/form/my-form';
import { ICompany } from '@modules/company/entity/company.entity';

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
            
          </MyForm>
          <MyForm label="Company Owner">
            
          </MyForm>

        </Col>
        <Col span={12}>
          <MyForm label="Phone Number">
            {company.mobile}
          </MyForm>
          <MyForm label="Type">
            {company.type}
          </MyForm>
          <MyForm label="Tags">
            
          </MyForm>
        </Col>
      </Row>
    </>
  )
}
