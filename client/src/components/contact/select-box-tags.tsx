import { useTags } from '@modules/tag/query/tag.get';
import { Form, Select, Tag } from 'antd'
const { Option } = Select;
export const SelectBoxTags = () => {
  const { data } = useTags();

  return (
    <Form.Item
      name="tagIds"
      label="Tags"
      initialValue={[]}
    >
      <Select
        mode="multiple"
        tagRender={({ value, closable, onClose }) => (
          <Tag
            color={data.find((tag) => tag.id == value).color}
            onMouseDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3 }}
          >
            {data.find((tag) => tag.id == value).name}
          </Tag>
        )}
      >
        {data?.map((tag) => (
          <Option value={tag.id} key={tag.id} >
            <Tag color={tag.color} key={tag.id} >
              {tag.name}
            </Tag>
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}
