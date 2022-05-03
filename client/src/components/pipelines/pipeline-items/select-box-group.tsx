import { PUBLIC_USER_INFO } from "@constance/cookie";
import { isRequired } from "@constance/rules-of-input-antd";
import { Role } from "@interfaces/type-roles";
import { ICompany } from "@modules/company/entity/company.entity";
import { useCompanies } from "@modules/company/query/company.get";
import { IContact } from "@modules/contact/entity/contact.entity";
import { Form, FormInstance, Input, Select } from "antd"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const { Option } = Select;

interface SelectBoxGroupProps {
  contact?: IContact;
  disabledCompany?: boolean;
  disabledContact?: boolean;
  companyId?: string;
  form?: FormInstance;
}

export const SelectBoxGroup: React.FC<SelectBoxGroupProps> = ({
  contact,
  disabledCompany = false,
  disabledContact = false,
  companyId,
  form
}) => {

  const [{ public_user_info: { id, role: { name } } }] = useCookies([PUBLIC_USER_INFO]);
  const { data: companies } = useCompanies();
  const [dataContact, setDataContact] = useState<IContact[]>([]);
  const [dataCompany, setDataCompany] = useState<ICompany[]>([]);

  useEffect(() => {
    if (contact) {
      const data = companies?.find((value) => value.id === contact?.company?.id)
      setDataContact(data?.contacts);
    }
    if (companyId) {
      const data = companies?.find((value) => value.id === companyId)
      setDataContact(data?.contacts);
    }
    if(name === Role.SALE_MANAGER) {
      setDataCompany(companies)
    } else {
      setDataCompany(companies?.filter((value) => value.creator?.id === id))
    }
  }, [companies, companyId])

  const handleSelected = (companyId: string) => {
    const data = companies?.find((value) => companyId === value.id);
    form.setFieldsValue({
      companyName: data.name,
      companyEmail: data.email,
      companyCity: data.city.admin_name
    })
    setDataContact(data.contacts)

    // if (name === Role.SALE_MANAGER)
    //   setDataContact(data.contacts)
    // else
    //   setDataContact(data.contacts.filter((contact) => contact.account.id === id))
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
          {dataCompany && dataCompany.map((value) =>
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
          onChange={(_, value) => {
            form.setFieldsValue({
              //@ts-ignore
              contactName: value.children[0],
              //@ts-ignore
              contactEmail: value.children[2],
              //@ts-ignore
              contactPhone: value.children[4]
            })
          }}
        >
          {dataContact?.map((contact) => (
            <Option key={contact.id} value={`${contact.id}`}>
              {contact.name} - {contact.email} - {contact.phone}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name='contactEmail' style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name='contactName' style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name='contactPhone' style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name='companyName' style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name='companyEmail' style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name='companyCity' style={{ display: 'none' }}>
        <Input />
      </Form.Item>
    </>
  )
}
