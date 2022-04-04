import { WrapperModalForm } from '@components/modal/modal-wrapper-form'
import { isNotWhiteSpace } from '@constance/rules-of-input-antd'
import { Form, Input, Row } from 'antd'
import { CompanyAddressForm } from './company-address-form'
import { CompanyInfoForm } from './company-info-form'

export const CreateCompanyForm = () => {
  return (
    <>
      <WrapperModalForm titleName='Company Information' >
        <Row gutter={[24, 0]}>
          <CompanyInfoForm />
        </Row>
      </WrapperModalForm>

      <WrapperModalForm titleName='Address Information' >
        <Row gutter={[24, 0]}>
          <CompanyAddressForm />
        </Row>
      </WrapperModalForm>
      <WrapperModalForm titleName='Addition Information' >
        <Form.Item
          name="description"
          label="Description"
          rules={[isNotWhiteSpace]}
        >
          <Input.TextArea showCount maxLength={150} placeholder="Description..." style={{ height: '80px' }} />
        </Form.Item>
      </WrapperModalForm>

      <WrapperModalForm titleName='Notes Information' >
        <Form.Item
          name="internalNotes"
          label="Internal Notes"
          rules={[isNotWhiteSpace]}
        >
          <Input.TextArea showCount maxLength={150} placeholder="Notes..." style={{ height: '80px' }} />
        </Form.Item>
      </WrapperModalForm>
    </>
  )
}
