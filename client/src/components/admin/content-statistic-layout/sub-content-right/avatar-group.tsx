import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';

export const AvatarGroup = () => {
  return <>
    <Avatar.Group
      maxCount={3}
      maxPopoverTrigger="click"
      size="large"
      maxStyle={{ color: '#f56a00', backgroundColor: '#fff3f0', cursor: 'pointer' }}
    >
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <Avatar style={{ backgroundColor: '#ff5c5a' }}>K</Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Tooltip>
      <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
      <Avatar style={{ backgroundColor: '#7E57C2' }}>A</Avatar>
      <Avatar style={{ backgroundColor: '#795548' }}>P</Avatar>
    </Avatar.Group>
  </>;
};
