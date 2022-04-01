import { IEmail } from '@modules/email/entity/email.enity';
import { Button, Descriptions, PageHeader } from 'antd';
import moment from 'moment';

interface SentHeaderProps {
  email: IEmail;
}

export const SentHeader: React.FC<SentHeaderProps> = ({ email }) => {
  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={email.subject}
        subTitle={email.receiverEmail}
        extra={[
          <Button key='3' danger>
            Delete
          </Button>,
          <Button key='1' type='primary'>
            Reply
          </Button>,
        ]}
      >
        <Descriptions size='small' column={3}>
          <Descriptions.Item label='Sender'>You</Descriptions.Item>

          <Descriptions.Item label='Sent at'>
            {moment(email.createdAt).format('DD MMMM YYYY')}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  );
};
