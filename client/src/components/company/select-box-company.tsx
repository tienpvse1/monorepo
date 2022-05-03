import { PUBLIC_USER_INFO } from "@constance/cookie";
import { isRequired } from "@constance/rules-of-input-antd";
import { Role } from "@interfaces/type-roles";
import { ICompany } from "@modules/company/entity/company.entity";
import { useCompanies } from "@modules/company/query/company.get";
import { Form, Select } from "antd"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const { Option } = Select;

export const SelectBoxCompany = () => {

  const [dataCompany, setDataCompany] = useState<ICompany[]>([]);
  const { data } = useCompanies();
  const [{ public_user_info: { id, role: { name } } }] = useCookies([PUBLIC_USER_INFO]);

  useEffect(() => {
    if (name === Role.SALE_MANAGER) {
      setDataCompany(data)
    } else {
      setDataCompany(data?.filter((value) => value.creator?.id === id))
    }
  }, [data])

  return (
    <>
      <Form.Item
        name="companyName"
        label="Company"
        rules={[isRequired('Company is required')]}
      >
        <Select
          showSearch
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
          {dataCompany && dataCompany.map((value) =>
            <Option key={value.name}>{value.name}</Option>
          )}
        </Select>
      </Form.Item>
    </>
  )
}
