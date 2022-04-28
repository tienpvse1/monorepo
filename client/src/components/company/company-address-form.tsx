import { SelectBoxProvinces } from '@components/signup/select-box-provinces'
import { isNotWhiteSpace, isPostalCode, isTaxId, isRequired } from '@constance/rules-of-input-antd';
import { useToggle } from '@hooks/useToggle';
import { Col, Form, FormInstance, Input, Select } from 'antd'
import { useState } from 'react';
import { InputWebsite } from './input-website';
const { Option } = Select;

interface CompanyAddressFormProps {
  defaultToggle?: boolean
  cityName?: string;
  form?: FormInstance<any>;
}

export const CompanyAddressForm: React.FC<CompanyAddressFormProps> = ({
  defaultToggle = true,
  cityName,
  form
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
            <Option disabled key={'Other'}>Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='address'
          label="Address"
          rules={[isNotWhiteSpace]}
        >
          <Input.TextArea showCount maxLength={150} />
        </Form.Item>
        {visible ? <SelectBoxProvinces form={form} cityName={cityName} /> :
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
            <Input maxLength={5} />
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

        <InputWebsite />

        <Form.Item
          name="taxId"
          label="Tax ID"
          rules={[isTaxId, isRequired('Tax id is required')]}
          required
        >
          <Input maxLength={13} />
        </Form.Item>

      </Col>
    </>
  )
}
