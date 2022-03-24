import { SelectBoxDistrict } from '@components/signup/select-box-district'
import { isPostalCode, isTaxId } from '@constance/rules-of-input-antd';
import { useToggle } from '@hooks/useToggle';
import { Col, Form, Input, Select } from 'antd'
import { useState } from 'react';
const { Option } = Select;

interface CompanyAddressFormProps {
  defaultToggle?: boolean
}

export const CompanyAddressForm: React.FC<CompanyAddressFormProps> = ({
  defaultToggle = true
}) => {
  const [visible, setVisible] = useToggle(defaultToggle);
  const [country, setCountry] = useState<string>('VN');
  return (
    <>
      <Col span={12}>
        <Form.Item
          name='region'
          label="Region"
          initialValue={'VN'}
        >
          <Select onChange={setVisible} onSelect={(value) => {
            if (value === 'Other')
              setCountry('');
            else
              setCountry('VN');
          }}>
            <Option key={'VN'}>Viet Nam</Option>
            <Option key={'Other'}>Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='address'
          label="Address"
        >
          <Input.TextArea showCount maxLength={150} />
        </Form.Item>
        {visible ? <SelectBoxDistrict /> :
          <Form.Item
            name='city'
            label="City"
          >
            <Input />
          </Form.Item>}
        <Input.Group compact>
          <Form.Item
            name="postalCode"
            label="Postal Code"
            rules={[isPostalCode]}
            style={{ width: 'calc(70% - 10px)', marginRight: '10px' }}
          >
            <Input maxLength={5}/>
          </Form.Item>
          {!visible && <Form.Item
            name='country'
            label="Country"
            initialValue={country}
            style={{ width: '30%' }}
          >
            <Input />
          </Form.Item>}
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
          rules={[isTaxId]}
        >
          <Input maxLength={13} />
        </Form.Item>

      </Col>
    </>
  )
}
