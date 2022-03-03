import { Form, Input, Row } from 'antd'
import { WrapperModalForm } from '@components/modal/wrapper-modal-form'
import { ContactInfoForm } from './contact-info-form';
import { AddressInfoForm } from './Address-info-form';

export const CreateContactForm = () => {

  return (
    <>

      <WrapperModalForm titleName='Contact Information' >
        <Row gutter={[24, 0]}>
          <ContactInfoForm />
        </Row>
      </WrapperModalForm>

      <WrapperModalForm titleName='Address Information' >
        <Row gutter={[24, 0]}>
          <AddressInfoForm />
        </Row>
      </WrapperModalForm>

      <WrapperModalForm titleName='Notes Information' >
        <Form.Item
          name="internalNotes"
          label="Internal Notes"
        >
          <Input.TextArea placeholder="notes..." style={{ height: '80px' }} />
        </Form.Item>
      </WrapperModalForm>
    </>
  )
}
