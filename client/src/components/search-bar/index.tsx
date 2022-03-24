import { SearchOutlined } from '@ant-design/icons'
import { useDebouncedValue } from '@mantine/hooks';
import { Button, Input } from 'antd'
import { useEffect, useRef, useState } from 'react';

interface SearchBarProps {
  placeholder: string;
  width?: number;
  setData?: (value: []) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, width, setData }) => {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 400);
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      console.log('call api:', debounced);
      setData([]);
    } else {
      isMounted.current = true;
    }
  }, [debounced])

  return (
    <div style={{ width: '100%' }}>
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
    </div>
  )
}
