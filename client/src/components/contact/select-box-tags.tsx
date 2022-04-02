import { useTags } from '@modules/tag/query/tag.get';
import { Form, Select, Tag } from 'antd'
const { Option } = Select;
export const SelectBoxTags = () => {
  const { data } = useTags();

  return (
    <Form.Item
      name="tags"
      label="Tags"
    >
      <Select>
        {data?.map((tag) => (
          <Option value={tag.id}>
            <Tag color={tag.color}>
              {tag.name}
            </Tag>
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}
