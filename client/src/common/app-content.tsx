import { Breadcrumb, Layout } from 'antd'
import { FooterApp } from './footer';
import { HeaderApp } from './header';
const { Content } = Layout;

export const ContentApp: React.FC = ({ children }) => {
    return (
        <Layout className="site-layout">
            {/* Put Header App here  */}
            <HeaderApp />

            {/* Content */}
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '20px 0px 0px 25px', fontSize: 18 }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background">
                    {children}
                </div>
            </Content>

            {/* Footer */}
            <FooterApp />
        </Layout>
    )
}