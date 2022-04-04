import { Header } from '@components/tag/header';
import { TagTable } from '@components/tag/tag-table';
import { Spin } from 'antd';
import { Suspense } from 'react';

interface TagProps {}

const Tag: React.FC<TagProps> = ({}) => {
  return (
    <div className='container-page'>
      <Header />
      <Suspense fallback={<Spin />}>
        <TagTable />
      </Suspense>
    </div>
  );
};

export default Tag;
