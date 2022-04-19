import { Form, Input } from "antd";

export const VerificationForm = () => {
  return (
    <>
      <Form.Item
        name="invoiceId"
        label="Invoice ID"
        initialValue={''}
        style={{ display: 'none' }}
      >
        <Input maxLength={14} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        initialValue={''}
      >
        <Input.TextArea
          showCount
          maxLength={150}
          placeholder="Write description..."
          rows={5}
        />
      </Form.Item>
      {/* hidden input */}
      <Form.Item name="oldStageId" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name="newStageId" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name="draggableId" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name="startColumnName" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name="finishColumnName" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
    </>
  )
}
