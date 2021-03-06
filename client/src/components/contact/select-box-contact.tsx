import { IContact } from '@modules/contact/entity/contact.entity';
import { Form, Select } from 'antd'
import { Rule } from 'antd/lib/form';
const { Option } = Select;

interface SelectBoxContactProps {
  data: IContact[];
  callback?: (contactIdSelected: string) => void;
  label?: string;
  formStyle?: React.CSSProperties;
  rule?: Rule[];
}

export const SelectBoxContact: React.FC<SelectBoxContactProps> = ({
  data,
  callback,
  label = 'Organization / Contact',
  formStyle,
  rule
}) => {
  return (
    <>
      <Form.Item name='contactId' style={formStyle} label={label} rules={rule}>
        <Select
          showSearch
          onSelect={callback}
          placeholder='Select a contact'
          optionFilterProp='children'
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {data?.map((contact) => (
            <Option key={contact.id} value={`${contact.id}`}>
              {contact.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
