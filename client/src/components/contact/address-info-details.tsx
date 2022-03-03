import { MyForm } from "@components/form/my-form"
import { Col, Row } from "antd"

export const AddressInfoDetails = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <MyForm label="Address">
            Hẻm 43 đường Trường Chinh, Q.1
          </MyForm>
          <MyForm label="City">
            TPHCM
          </MyForm>
          <MyForm label="Post Code">
            7777777
          </MyForm>
          <MyForm label="Country">
            Viet Nam
          </MyForm>
        </Col>
        <Col span={12}>
          <MyForm label="Job Position">
            Sales manager
          </MyForm>
          <MyForm label="Website">
            abc.com
          </MyForm>
          <MyForm label="TaxID">
            01864321564654
          </MyForm>
        </Col>
      </Row>
    </>
  )
}
