import { DatePicker, Form, Input, Select } from 'antd'

export const CreateFormSchedule = () => {
  return (
    <div style={{ padding: '14px' }}>
      <Form.Item
        name="type"
        label="Activity Type"
      >
        <Select>

        </Select>
      </Form.Item>

      <Form.Item
        name="summary"
        label="Summary"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="dueDate"
        label="Due Date"
      >
        <DatePicker style={{width: '100%'}} />
      </Form.Item>

      <Form.Item
        name="accountId"
        label="Assigned to"
      >
        <Select>

        </Select>
      </Form.Item>
    </div>
  )
}
