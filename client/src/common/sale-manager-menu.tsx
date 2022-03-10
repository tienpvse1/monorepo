import { Menu } from 'antd';

interface SaleManagerMenuProps {}

export const SaleManagerMenu: React.FC<SaleManagerMenuProps> = ({}) => {
  return (
    <Menu
      defaultOpenKeys={['sub1']}
      // @ts-ignore
      selectedKeys={''}
      mode='inline'
    >
      <Menu.Item key={''}>Sale Manage</Menu.Item>
      <Menu.Item>Menu</Menu.Item>
      <Menu.Item>Menu</Menu.Item>
    </Menu>
  );
};
