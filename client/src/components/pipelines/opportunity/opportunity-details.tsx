import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Card, Divider, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { SecondColumn } from './second-column';
import { ThirdColumn } from './third-column';

interface OpportunityDetailsProps {
  dataCardPipeline: IPipelineItem;
}

export const OpportunityDetails: React.FC<OpportunityDetailsProps> = ({
  dataCardPipeline,
}) => {
  return (
    <div style={{ display: 'flex' }}>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt='example'
            src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
          />
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
              <span>Phan Văn Tiến</span>
              <br />
              <span>CEO</span>
              <br />
              Email:{' '}
              <i style={{ textDecoration: 'underline', color: 'blue' }}>
                tienpvse@gmail.com
              </i>
            </>
          }
        />
        <Divider />
        <div>
          <Tag color={'error'}>Private</Tag>
        </div>
      </Card>
      <SecondColumn />
      <ThirdColumn />
    </div>
  );
};
