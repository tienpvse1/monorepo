import { Form, Input, Row } from 'antd'
import { WrapperModalForm } from '@components/modal/modal-wrapper-form'
import { ContactInfoForm } from './contact-info-form';
import { isNotWhiteSpace } from '@constance/rules-of-input-antd';

export const CreateContactForm = () => {

  return (
    <>

      <WrapperModalForm titleName='Contact Information' >
        <Row gutter={[24, 0]}>
          <ContactInfoForm />
        </Row>
      </WrapperModalForm>

      <WrapperModalForm titleName='Notes Information' >
        <Form.Item
          name="internalNotes"
          label="Internal Notes"
          rules={[isNotWhiteSpace]}
        >
          <Input.TextArea showCount maxLength={150} placeholder="notes..." style={{ height: '80px' }} />
        </Form.Item>
      </WrapperModalForm>
    </>
  )
}
