import { Layout } from 'antd'
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
                <div className="site-layout-background">
                    {children}
                </div>
            </Content>

            {/* Footer */}
            <FooterApp />
        </Layout>
    )
}