import { LogoSider } from '@components/layout/sider/logo-sider';
import { useToggle } from '@hooks/useToggle';
import { Layout } from 'antd';
const { Sider } = Layout;

export const SiderApp: React.FC = ({ children }) => {

  const [collapsed, onCollapse] = useToggle();

  return (
    <Sider
      className='layout-sider'
      trigger={null}
      theme='light'
      width={250}
      collapsible
      collapsed={collapsed}
    >
      <LogoSider onCollapse={onCollapse} collapsed={collapsed} />
      {children}
    </Sider>
  )
}
