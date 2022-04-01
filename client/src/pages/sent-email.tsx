import { Spin } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

interface SentEmailsProps {}

const SentEmails: React.FC<SentEmailsProps> = ({}) => {
  return (
    <Suspense fallback={<Spin />}>
      <Outlet />
    </Suspense>
  );
};
export default SentEmails;
