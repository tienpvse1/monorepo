import { useQueryAccountBySaleRole } from '@modules/account/get/account.get';
import { Form, Select } from 'antd'
const { Option } = Select;

export const SelectBoxSalePerson = () => {
  const { data } = useQueryAccountBySaleRole();
  return (
    <>
      <Form.Item
        name="salePerson"
        label="Sale Person"
      >
        <Select disabled>
          {data?.map((account) => (
            <Option key={account.id} value={account.id}>
                {`${account.firstName} ${account.lastName}`}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
