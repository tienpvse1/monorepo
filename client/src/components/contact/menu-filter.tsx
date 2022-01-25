import { Menu, message } from 'antd';

const onClick = ({ key }: any) => {
  message.info(`Click on item ${key}`);
};

export const MenuFilter = () => {
  return (
    <Menu onClick={onClick} style={{ borderRadius: '4px' }}>
      <Menu.Item key="person">
        <span>Person</span>
      </Menu.Item>
      <Menu.Item key="company">
        <span>Company</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="filterSaved">
        <span>Filter Saved</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="moreFilter">Add more filter</Menu.Item>
    </Menu>
  )
}
