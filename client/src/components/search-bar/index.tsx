import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'

interface SearchBarProps {
  placeholder: string;
  width?: number;
}

export const SearchBar = ({ placeholder, width }: SearchBarProps) => {
  return (
    <div style={{ width: '100%' }}>
      <Input
        size="small"
        placeholder={placeholder}
        style={{ borderRadius: '10px', width: width }}
        suffix={
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            style={{ borderStyle: 'none' }} />
        } />
    </div>
  )
}
