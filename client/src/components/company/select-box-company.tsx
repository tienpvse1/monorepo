import { PUBLIC_USER_INFO } from "@constance/cookie";
import { isRequired } from "@constance/rules-of-input-antd";
import { useCompanies } from "@modules/company/query/company.get";
import { Form, Select } from "antd"
import { useCookies } from "react-cookie";
const { Option } = Select;

export const SelectBoxCompany = () => {
  const { data } = useCompanies();
  const [{ public_user_info: { id } }] = useCookies([PUBLIC_USER_INFO]);


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
          {data && data.filter((company) => company.creator?.id === id).map((value) => 
            <Option key={value.name}>{value.name}</Option>
          )}
        </Select>
      </Form.Item>
    </>
  )
}
