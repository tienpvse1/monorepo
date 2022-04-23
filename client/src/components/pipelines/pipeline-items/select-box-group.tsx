import { PUBLIC_USER_INFO } from "@constance/cookie";
import { isRequired } from "@constance/rules-of-input-antd";
import { Role } from "@interfaces/type-roles";
import { useCompanies } from "@modules/company/query/company.get";
import { IContact } from "@modules/contact/entity/contact.entity";
import { Form, Select } from "antd"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const { Option } = Select;

interface SelectBoxGroupProps {
  contact?: IContact;
  disabledCompany?: boolean;
  disabledContact?: boolean;
  companyId?: string;
}

export const SelectBoxGroup: React.FC<SelectBoxGroupProps> = ({
  contact,
  disabledCompany = false,
  disabledContact = false,
  companyId
}) => {

  const [dataContact, setDataContact] = useState<IContact[]>([]);
  const { data: companies } = useCompanies();
  const [{ public_user_info: { id, role: { name } } }] = useCookies([PUBLIC_USER_INFO]);

  useEffect(() => {
    if (contact) {
      const data = companies?.find((value) => value.id === contact?.company?.id)
      setDataContact(data?.contacts);
    }
    console.log('companyId:', companyId);
    
    if (companyId) {
      const data = companies?.find((value) => value.id === companyId)
      console.log("companyFind:", data);
      
      setDataContact(data?.contacts);
    }
  }, [companies, companyId])

  const handleSelected = (companyId: string) => {
    const data = companies?.find((value) => companyId === value.id);
    if (name === Role.SALE_MANAGER)
      setDataContact(data.contacts)
    else
      setDataContact(data.contacts.filter((contact) => contact.account.id === id))
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
          onChange={handleSelected}
          placeholder='Select a company'
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
          disabled={disabledContact}
          showSearch
          placeholder='Select a contact'
          optionFilterProp='children'
        >
          {dataContact?.map((contact) => (
            <Option key={contact.id} value={`${contact.id}`}>
              {contact.name} - {contact.email}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
