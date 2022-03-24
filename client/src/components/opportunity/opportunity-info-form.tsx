import { isQuantity, isRequired } from '@constance/rules-of-input-antd'
import { SelectBoxCourse } from '@components/course/select-box-Course';
import { Col, DatePicker, Form, Input, InputNumber } from 'antd'
import { SelectBoxContact } from '@components/contact/select-box-contact';
import { useCookies } from 'react-cookie';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useContacts } from '@modules/contact/query/contact.get';
import { SelectBoxStage } from '@components/opportunity/select-box-stage';
import { SelectBoxSalePerson } from '@components/sale/select-box-sale-person';
import { ITeam } from '@modules/team/entity/team.entity';

interface OpportunityInfoFormProps {
  showStageInput?: boolean;
  team?: ITeam;
}

export const OpportunityInfoForm: React.FC<OpportunityInfoFormProps> = ({ showStageInput = true, team }) => {
  const [
    {
      public_user_info: { id, role },
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

        {role.name === 'sale_manager' && <SelectBoxSalePerson team={team}/>}

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
