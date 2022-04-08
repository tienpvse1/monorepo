import { imagePlaceHolderUrl } from '@constance/image';
import { Card, Divider, Image, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';

interface CardImageProps {
  title?: string;
  email?: string;
  photo?: string;
  description1?: string;
  description2?: string;
}

export const CardImage: React.FC<CardImageProps> = ({
  title,
  email,
  photo,
  description1,
  description2,
}) => {
  return (
    <>
      <Card
        bordered={false}
        cover={
          <div style={{ padding: 20 }}>
            <Image alt='example' src={photo ? photo : imagePlaceHolderUrl} />
          </div>
        }
      >
        <Meta
          title={title}
          description={
            <>
              <span
                style={{
                  color: 'rgba(0,0,0,0.9)',
                  fontSize: 16,
                }}
              >
                {description1}
              </span>
              <br />
              <span>{description2}</span>
              <br />
              Email:{' '}
              <i style={{ textDecoration: 'underline', color: 'blue' }}>
                {email}
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
  );
};
