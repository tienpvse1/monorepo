import { isRequired } from "@constance/rules-of-input-antd";
import { useCompanies } from "@modules/company/query/company.get";
import { IContact } from "@modules/contact/entity/contact.entity";
import { Form, Select } from "antd"
import { useEffect, useState } from "react";
const { Option } = Select;

interface SelectBoxGroupProps {
  contact?: IContact;
  disabledCompany?: boolean
}

export const SelectBoxGroup: React.FC<SelectBoxGroupProps> = ({
  contact,
  disabledCompany = false
}) => {

  const [dataContact, setDataContact] = useState<IContact[]>([]);
  const { data: companies } = useCompanies();

  useEffect(() => {
    if (contact) {
      const data = companies?.find((value) => value.id === contact?.company?.id)
      setDataContact(data?.contacts);
    }
  }, [companies])

  const handleSelected = (companyId: string) => {
    const data = companies?.find((value) => companyId === value.id);
    setDataContact(data.contacts)
  }
  return (
    <>
      <Form.Item
        name="companyName"
        label="Company"
        rules={[isRequired('Company is required')]}
      >
        <Select
          disabled={disabledCompany}
          showSearch
          onSelect={handleSelected}
          placeholder='Select a company'
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
          {companies && companies.map((value) =>
            <Option key={value.id}>{value.name}</Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item
        name='contactId'
        label='Organization / Contact'
        rules={[isRequired('Contact is required')]}
      >
        <Select
          // onSelect={handleSelect}
          showSearch
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
          {dataContact?.map((contact) => (
            <Option key={contact.id} value={`${contact.id}`}>
              {contact.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
