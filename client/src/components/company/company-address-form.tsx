import { SelectBoxDistrict } from '@components/signup/select-box-district'
import { Col, Form, Input } from 'antd'

export const CompanyAddressForm = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name={['addresses', 'address']}
          label="Address"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="habitualResidence"
          label="Habitual Residence"
        >
          <SelectBoxDistrict />
        </Form.Item>
        <Form.Item
          name={['addresses', 'city']}
          label="City"
        >
          <Input />
        </Form.Item>
        <Input.Group compact>
          <Form.Item
            name="postalCode"
            label="Postal Code"
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
          name="website"
          label="Website"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="taxId"
          label="Tax ID"
        >
          <Input maxLength={14} />
        </Form.Item>
        
      </Col>
    </>
  )
}
