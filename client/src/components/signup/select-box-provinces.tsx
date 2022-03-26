import { useDebouncedValue } from '@mantine/hooks';
import { IProvinces } from '@modules/provinces/entity/provinces.entity';
import { getStateByCity, searchCity } from '@modules/provinces/query/provinces.get';
import { Form, Input, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
const { Option } = Select;

interface SelectBoxProvincesProps {
  cityName?: string;
}
export const SelectBoxProvinces: React.FC<SelectBoxProvincesProps> = ({ cityName }) => {

  const [text, setText] = useState('');
  const [dataCity, setDataCity] = useState<IProvinces[]>();
  const [dataState, setDataState] = useState<IProvinces[]>();

  const [debounced] = useDebouncedValue(text, 400);
  const isMounted = useRef(false);


  useEffect(() => {
    if (isMounted.current) {
      searchCity(debounced).then((data) => setDataCity(data));
    } else {
      isMounted.current = true;
      searchCity(cityName).then((data) => setDataCity(data));
    }
  }, [debounced])

  const handleSelected = (_, value: any) => {
    getStateByCity(value.children).then((value) => setDataState(value))
  }

  return (
    <>
      <Input.Group compact>
        <Form.Item
          name='cityId'
          label="City"
          style={{ width: 'calc(50% - 10px)', marginRight: '10px' }}
        >
          <Select
            showSearch
            placeholder="city..."
            optionFilterProp="children"
            onSelect={handleSelected}
            onSearch={(text) => setText(text)}
          >
            {dataCity?.map((value) => (
              <Option key={value.id}>{value.admin_name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='state'
          label="State"
          style={{ width: '50%' }}
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
              <Option key={value.city}>{value.city}</Option>
            ))}
          </Select>
        </Form.Item>
      </Input.Group>
    </>
  );
};
