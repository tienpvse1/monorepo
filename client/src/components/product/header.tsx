import { Descriptions, Input, PageHeader } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface ProductHeaderProps {
  setSearch: Dispatch<SetStateAction<string>>;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ setSearch }) => {
  return (
    <>
      <PageHeader
        className='site-page-header'
        onBack={() => window.history.back()}
        title='Course'
        subTitle='courses from VJAA system'
        extra={[
          <Input.Search
            placeholder='input search text'
            onSearch={(value) => setSearch(value)}
            style={{ width: 200 }}
          />,
        ]}
      >
        <Descriptions size='small' column={3}>
          <Descriptions.Item label='Total course'>
            <a>7694</a>
          </Descriptions.Item>
          <Descriptions.Item label='Enabled courses'>6421</Descriptions.Item>
          <Descriptions.Item label='Disable courses'>273</Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
};
