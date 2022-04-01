import { IInbox } from '@modules/inbox/entity/inbox.entity';
import { Button, Descriptions, PageHeader } from 'antd';
import moment from 'moment';

interface InboxHeaderProps {
  email: IInbox;
}

export const InboxHeader: React.FC<InboxHeaderProps> = ({ email }) => {
  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={email.subject}
        subTitle={email.sender.email}
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
          <Descriptions.Item label='Sender'>
            {email.sender.name}
          </Descriptions.Item>

          <Descriptions.Item label='Sent at'>
            {moment(email.createdAt).format('DD MMMM YYYY')}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  );
};
