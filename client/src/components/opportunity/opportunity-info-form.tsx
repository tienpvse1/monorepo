import { isQuantity, isRequired, isNotWhiteSpace, isRevenue } from '@constance/rules-of-input-antd'
import { SelectBoxCourse } from '@components/course/select-box-Course';
import { Badge, Col, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import { SelectBoxStage } from '@components/opportunity/select-box-stage';
import { SelectBoxGroup } from '@components/pipelines/pipeline-items/select-box-group';
import { IContact } from '@modules/contact/entity/contact.entity';

interface OpportunityInfoFormProps {
  showStageInput?: boolean;
  contact?: IContact;
  disabledCompany?: boolean;
  disabledContact?: boolean;
  courseId?: string;
}

export const OpportunityInfoForm: React.FC<OpportunityInfoFormProps> = ({
  showStageInput = true,
  contact,
  disabledCompany = false,
  disabledContact = false,
  courseId
}) => {

  return (
    <>
      <Col span={12}>
        <Form.Item
          name="name"
          label="Name"
          required
          rules={[isRequired('Opportunity name is required'), isNotWhiteSpace]}>
          <Input />
        </Form.Item>

        <SelectBoxGroup
          disabledContact={disabledContact}
          disabledCompany={disabledCompany}
          contact={contact}
        />

        <Form.Item
          name="expectedClosing"
          label="Close Date"
          required
          rules={[isRequired('Close Date is required')]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        {showStageInput && <SelectBoxStage />}

        <Form.Item name='priority' label='Priority' initialValue={1}>
          <Select>
            <Select.Option value={2}>
              <Badge color={'red'} text='Important' />
            </Select.Option>
            <Select.Option value={1}>
              <Badge color={'yellow'} text='Medium' />
            </Select.Option>
            <Select.Option value={0}>
              <Badge color={'blue'} text='Low' />
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="expectedRevenue"
          label="Expected Revenue"
          rules={[isRevenue]}
          initialValue={'0'}
        >
          <Input suffix={"đ"} style={{ height: '40px', borderRadius: '5px' }} />
        </Form.Item>

        <Input.Group compact>
          <SelectBoxCourse
            courseId={courseId}
            styleFormItem={{ width: 'calc(80% - 10px)', marginRight: '10px' }}
          />

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[isQuantity]}
            initialValue={1}
            style={{ width: '20%' }}
          >
            <InputNumber style={{ width: '100%' }} className="my-input-number" />
          </Form.Item>
        </Input.Group>
      </Col>
    </>
  )
}
