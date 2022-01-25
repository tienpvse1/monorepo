import { Layout } from 'antd';
import { MenuHeader } from '../components/header/menu-header';
const { Header } = Layout;



export const HeaderApp = () => {
    return (
        <Header className="header-layout-background">
            <div style={{ flex: '1 1 0%' }}></div>
            <div>
                <MenuHeader />
            </div>
        </Header>
    )
}
