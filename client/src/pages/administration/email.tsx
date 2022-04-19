import { BirthdayEmail } from '@components/admin/email/birthday';
import { Spin, Tabs } from 'antd';
import { Suspense } from 'react';

interface EmailDesignProps {}
const { TabPane } = Tabs;
const EmailDesign: React.FC<EmailDesignProps> = ({}) => {
  return (
    <Tabs defaultActiveKey='1' type='line'>
      <TabPane tab='Birthday' key='1'>
        <Suspense fallback={<Spin />}>
          <BirthdayEmail />
        </Suspense>
      </TabPane>
      <TabPane tab='Course expiration' key='2'>
        Course expiration
      </TabPane>
      <TabPane tab='Certification expiration' key='3'>
        Certification expiration
      </TabPane>
    </Tabs>
  );
};

export default EmailDesign;
