import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Loading } from '@components/loading/loading';
import { imagePlaceHolderUrl } from '@constance/image';
import { usePipelineItem } from '@modules/pipeline-items/query/pipeline-item.get';
import { handleUndefinedString } from '@util/undefined';
import { Card, Divider, Image, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Suspense } from 'react';
import { SecondColumn } from './second-column';
import { ThirdColumn } from './third-column';

interface OpportunityDetailsProps {
  pipelineItemId: string;
}

export const OpportunityDetails: React.FC<OpportunityDetailsProps> = ({
  pipelineItemId,
}) => {
  const { data } = usePipelineItem(pipelineItemId);
  return (
    <div style={{ display: 'flex' }}>
      <Card
        style={{ width: 300 }}
        cover={
          <div style={{ padding: 20 }}>
            <Image
              alt='example'
              src={data.photo ? data.photo : imagePlaceHolderUrl}
            />
          </div>
        }
        actions={[
          <SettingOutlined key='setting' />,
          <EditOutlined key='edit' />,
          <EllipsisOutlined key='ellipsis' />,
        ]}
      >
        <Meta
          title='Summary'
          description={
            <>
              <span
                style={{
                  color: 'rgba(0,0,0,0.9)',
                  fontSize: 16,
                }}
              >
                {handleUndefinedString(data.title)}
              </span>
              <br />
              <span>{handleUndefinedString(data.jobPosition)}</span>
              <br />
              Email:{' '}
              <i style={{ textDecoration: 'underline', color: 'blue' }}>
                {handleUndefinedString(data.email)}
              </i>
            </>
          }
        />
        <Divider />
        <div>
          {/* //!TODO this field is still hard coded */}
          <Tag color={'error'}>Private</Tag>
        </div>
      </Card>
      <Suspense fallback={<Loading />}>
        <SecondColumn data={data} />
      </Suspense>
      <ThirdColumn />
    </div>
  );
};
