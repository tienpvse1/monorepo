import { SearchOutlined } from '@ant-design/icons'
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useDebouncedValue } from '@mantine/hooks';
import { Button, Form, Input } from 'antd'
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';

interface SearchBarProps {
  placeholder: string;
  width?: number | string;
  setData?: (value: []) => void;
  getApi?: (text: string, id?: string) => Promise<any>;
  float?: any;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  width,
  setData,
  getApi,
  float
}) => {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 400);
  const isMounted = useRef(false);
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);

  useEffect(() => {
    if (isMounted.current) {
      getApi(debounced, public_user_info.id).then((data) => setData(data));
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
          style={{ borderRadius: '10px', width: width, float: float }}
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
