import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { imagePlaceHolderUrl } from '@constance/image';
import { handleUndefinedString } from '@util/undefined';
import { Card, Divider, Image, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';

interface CardImageProps {
  data?: any
}

export const CardImage: React.FC<CardImageProps> = ({ data = [] }) => {
  return (
    <>
      <Card
        bordered={false}
        cover={
          <div style={{ padding: 20 }}>
            <Image
              alt='example'
              src={data.photo ? data.photo : imagePlaceHolderUrl}
            />
          </div>
        }
        actions={[
          <SettingOutlined style={{ fontSize: '24px' }} key='setting' />,
          <EditOutlined style={{ fontSize: '24px' }} key='edit' />,
          <EllipsisOutlined style={{ fontSize: '24px' }} key='ellipsis' />,
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
    </>
  )
}
