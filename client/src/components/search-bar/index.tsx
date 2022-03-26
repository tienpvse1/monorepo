import { SearchOutlined } from '@ant-design/icons'
import { useDebouncedValue } from '@mantine/hooks';
import { Button, Form, Input } from 'antd'
import { useEffect, useRef, useState } from 'react';

interface SearchBarProps {
  placeholder: string;
  width?: number;
  setData?: (value: []) => void;
  getApi?: (text: string) => Promise<any>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, width, setData, getApi }) => {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 400);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      console.log('call api:', debounced);
      getApi(debounced).then((data) => setData(data));
      // getApi(debounced).then((data) => queryClient.setQueryData(QUERY_CONTACTS, data));
    } else {
      isMounted.current = true;
    }
  }, [debounced])

  return (
    <div style={{ width: '100%' }}>
      <Form.Item name='inputSearch' style={{ margin: 0 }}>
        <Input
          onChange={(event) => setValue(event.currentTarget.value)}
          size="small"
          placeholder={placeholder}
          style={{ borderRadius: '10px', width: width }}
          suffix={
            <Button
              shape="circle"
              icon={<SearchOutlined />}
              style={{ borderStyle: 'none' }} />
          }
        />
      </Form.Item>
    </div>
  )
}
