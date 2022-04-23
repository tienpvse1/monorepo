import { Form, FormInstance, Input, Row } from 'antd'
import { WrapperModalForm } from '@components/modal/modal-wrapper-form'
import { OpportunityInfoForm } from './opportunity-info-form'
import { OpportunityAdditionalForm } from './opportunity-additional-form'
import { isNotWhiteSpace } from '@constance/rules-of-input-antd'
import { SubmitFormCreateOpportunity } from './opportunity-table'

interface CreateOpportunityFormProps {
  form: FormInstance;
  dataSetField?: SubmitFormCreateOpportunity;
}

export const CreateOpportunityForm: React.FC<CreateOpportunityFormProps> = ({ form, dataSetField }) => {
  console.log("dataSetField:", dataSetField);

  return (
    <>
      <WrapperModalForm titleName='Opportunity Information' >
        <Row gutter={[24, 0]}>
          <OpportunityInfoForm
            courseId={dataSetField.courseId}
            companyId={dataSetField.companyName}
            form={form}
          />
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
          rules={[isNotWhiteSpace]}
        >
          <Input.TextArea showCount maxLength={150} placeholder="Notes..." style={{ height: '80px' }} />
        </Form.Item>
      </WrapperModalForm>
    </>
  )
}
