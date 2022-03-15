import { Col, Row } from 'antd';
import { MyForm } from '@components/form/my-form';

export const CompanyInfoDetails = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <MyForm label="Name">
            Company Name
          </MyForm>
          <MyForm label="Email">
            company@gmail.com
          </MyForm>
          <MyForm label="Company Owner">
            ChuongNguyen
          </MyForm>
          <MyForm label="Date of incorporation">
            {/* {contact.birth ? moment(contact.birth).format(BIRTH).toString() : ''} */}
            1990-02-02
          </MyForm>

        </Col>
        <Col span={12}>
          <MyForm label="Telephone">
            0123456789
          </MyForm>
          <MyForm label="Type">
            Company type
          </MyForm>
          <MyForm label="Tags">
            Company tags
          </MyForm>
        </Col>
      </Row>
    </>
  )
}
