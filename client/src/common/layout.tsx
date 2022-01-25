import { Layout } from 'antd';
import { ReactNode } from 'react';
import { ContentApp } from './app-content';
import { SiderApp } from './sider';

interface LayoutAppProps {
  content: ReactNode;
  menuSider: ReactNode;
}

export const LayoutApp = ({ content, menuSider }: LayoutAppProps) => {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderApp>
        {menuSider}
      </SiderApp>

      <ContentApp>
        {content}
      </ContentApp>
    </Layout>
  );
};
