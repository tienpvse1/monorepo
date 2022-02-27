import { Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { WrapperModalForm } from '@components/modal/wrapper-modal-form'
import { SelectBoxPrefix } from "@components/signup/select-box-prefix-phone";

export const FormCreateContact = () => {

  return (
    <>

      <WrapperModalForm titleName='Contact Information' >
        <Row gutter={[24, 0]}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              required
              rules={[
                {
                  required: true,
                  message: 'Name is required',
                }
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              required
              rules={[
                {
                  required: true,
                  message: 'Email is required',
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                }
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="birth"
              label="Birth"
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="title"
              label="Title"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="mobile"
              label="Mobile"
              required
              rules={[
                {
                  required: true,
                  message: 'Mobile is required',
                },
                {
                  pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: 'Must be phone number',
                }
              ]}
            >
              <Input addonBefore={<SelectBoxPrefix />} />
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
            >
              <Select>

              </Select>
            </Form.Item>

          </Col>
        </Row>
      </WrapperModalForm>

      <WrapperModalForm titleName='Address Information' >
        <Row gutter={[24, 0]}>
          <Col span={12}>
            <Form.Item
              name={['addresses', 'address']}
              label="Address"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name={['addresses', 'city']}
              label="City"
            >
              <Input />
            </Form.Item>
            <Input.Group compact>
              <Form.Item
                name="postCode"
                label="Post Code"
                style={{ width: 'calc(70% - 10px)', marginRight: '10px' }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['addresses', 'country']}
                label="Country"
                style={{ width: '30%' }}
              >
                <Input />
              </Form.Item>
            </Input.Group>
          </Col>
          <Col span={12}>
            <Form.Item
              name="jobPosition"
              label="Job Position"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="website"
              label="Website"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="taxId"
              label="Tax ID"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </WrapperModalForm>

      <WrapperModalForm titleName='Notes Information' >
        <Form.Item
          name="internalNotes"
          label="Internal Notes"
        >
          <Input.TextArea placeholder="notes..." style={{ height: '80px' }} />
        </Form.Item>
      </WrapperModalForm>
    </>
  )
}
