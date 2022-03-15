import { isQuantity, isRequired } from '@constance/rules-of-input-antd'
import { Col, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import { SelectBoxProduct } from '@components/product/select-box-product';
import { SelectBoxContact } from '@components/contact/select-box-contact';
import { useCookies } from 'react-cookie';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useContacts } from '@modules/contact/query/contact.get';
import { SelectBoxStage } from '@components/opportunity/select-box-stage';
import { SelectBoxSalePerson } from '@components/sale/select-box-sale-person';
const { Option } = Select;

interface OpportunityInfoFormProps {
  showStageInput?: boolean;
}

export const OpportunityInfoForm: React.FC<OpportunityInfoFormProps> = ({ showStageInput = true }) => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data } = useContacts(id);

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

        <SelectBoxContact rule={[isRequired('Contact is required')]} data={data} />

        <SelectBoxSalePerson />

        <Form.Item
          name="saleTeam"
          label="Sale Team"
          initialValue={1}
        >
          <Select disabled>
            <Option value={1}>
              Team ABC (Sample)
            </Option>
          </Select>
        </Form.Item>

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

        <SelectBoxProduct />

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
