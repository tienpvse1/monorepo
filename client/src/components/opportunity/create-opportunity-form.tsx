import { Form, Input, Row } from 'antd'
import { WrapperModalForm } from '@components/modal/modal-wrapper-form'
import { OpportunityInfoForm } from './opportunity-info-form'
import { OpportunityAdditionalForm } from './opportunity-additional-form'

export const CreateOpportunityForm = () => {
  return (
    <>
      <WrapperModalForm titleName='Opportunity Information' >
        <Row gutter={[24, 0]}>
          <OpportunityInfoForm  />
        </Row>
      </WrapperModalForm>

      <WrapperModalForm titleName='Additional Information' >
        <Row gutter={[24, 0]}>
          <OpportunityAdditionalForm />
        </Row>
      </WrapperModalForm>

      <WrapperModalForm titleName='Notes Information' >
        <Form.Item
          name="internalNotes"
          label="Internal Notes"
        >
          <Input.TextArea showCount maxLength={150} placeholder="Notes..." style={{ height: '80px' }} />
        </Form.Item>
      </WrapperModalForm>
    </>
  )
}
