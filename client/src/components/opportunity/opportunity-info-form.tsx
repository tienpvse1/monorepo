import { isQuantity, isRequired } from '@constance/rules-of-input-antd'
import { SelectBoxCourse } from '@components/course/select-box-Course';
import { Col, DatePicker, Form, Input, InputNumber } from 'antd'
import { SelectBoxStage } from '@components/opportunity/select-box-stage';
import { SelectBoxGroup } from '@components/pipelines/pipeline-items/select-box-group';
import { IContact } from '@modules/contact/entity/contact.entity';

interface OpportunityInfoFormProps {
  showStageInput?: boolean;
  contact?: IContact;
  disabledCompany?: boolean;
}

export const OpportunityInfoForm: React.FC<OpportunityInfoFormProps> = ({
  showStageInput = true,
  contact,
  disabledCompany = false
}) => {

  return (
    <>
      <Col span={12}>
        <Form.Item
          name="name"
          label="Name"
          required
          rules={[isRequired('Opportunity name is required')]}>
          <Input />
        </Form.Item>

        <SelectBoxGroup disabledCompany={disabledCompany} contact={contact} />

        <Form.Item
          name="expectedClosing"
          label="Close Date"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={12}>

        {showStageInput && <SelectBoxStage />}

        <Form.Item
          name="expectedRevenue"
          label="Expected Revenue"
        >
          <Input />
        </Form.Item>

        <SelectBoxCourse />

        <Form.Item
          name="quantity"
          label="Expected sold quantity"
          rules={[isQuantity]}
          initialValue={1}
        >
          <InputNumber className="my-input-number" />
        </Form.Item>
      </Col>
    </>
  )
}
