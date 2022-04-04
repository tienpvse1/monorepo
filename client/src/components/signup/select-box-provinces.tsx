import { isRequired } from '@constance/rules-of-input-antd';
import { useDebouncedValue } from '@mantine/hooks';
import { IProvinces } from '@modules/provinces/entity/provinces.entity';
import { getStateByCity, searchCity } from '@modules/provinces/query/provinces.get';
import { Form, FormInstance, Input, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
const { Option } = Select;

interface SelectBoxProvincesProps {
  cityName?: string;
  form?: FormInstance<any>;
}
export const SelectBoxProvinces: React.FC<SelectBoxProvincesProps> = ({ cityName, form }) => {

  const [text, setText] = useState('');
  const [dataCity, setDataCity] = useState<IProvinces[]>();
  const [dataState, setDataState] = useState<IProvinces[]>();
  const [debounced] = useDebouncedValue(text, 400);
  const isMounted = useRef(false);

  useEffect(() => {
    //Disable auto fill city of chrome
    //@ts-ignore
    document.getElementById('cityName').autocomplete = 'no';
    //@ts-ignore
    document.getElementById('cityId').autocomplete = 'no';

    if (isMounted.current) {
      searchCity(debounced).then((data) => setDataCity(data));
    } else {
      isMounted.current = true;
      if (cityName)
        getStateByCity(cityName).then((value) => setDataState(value));
      else
        searchCity('').then((data) => setDataCity(data));
    }
  }, [debounced])

  const handleSelected = (_, value: any) => {
    if (form) {
      form.setFieldsValue({ cityId: '' });
    }
    document.getElementById('cityId').focus()
    getStateByCity(value.children).then((value) => setDataState(value))
  }

  return (
    <>
      <Input.Group compact>

        <Form.Item
          name="cityName"
          label="City"
          style={{ width: 'calc(50% - 10px)', marginRight: '10px' }}
          rules={[isRequired('City is required')]}
        >
          <Select
            showSearch
            placeholder="city..."
            optionFilterProp="children"
            onSelect={handleSelected}
            onSearch={(text) => setText(text)}
          >
            {dataCity?.map((value) => (
              <Option key={value.admin_name}>{value.admin_name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='cityId'
          label="State"
          style={{ width: '50%' }}
          rules={[isRequired('State is required')]}
        >
          <Select
            showSearch
            placeholder="state..."
            optionFilterProp="children"
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {dataState?.map((value) => (
              <Option key={value.id}>{value.city}</Option>
            ))}
          </Select>
        </Form.Item>
      </Input.Group>
    </>
  );
};
