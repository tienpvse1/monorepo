import { IInbox } from '@modules/inbox/entity/inbox.entity';
import {
  QUERY_MY_INBOX_EMAIL_FROM_CONTACTS,
  useInboxById,
} from '@modules/inbox/query/inbox.get';
import { useParams } from 'react-router-dom';
import { client } from '../App';
import ReactHtmlParser from 'react-html-parser';
import { InboxHeader } from '@components/inbox/inbox-header';
interface EmailContentProps {}

const EmailContent: React.FC<EmailContentProps> = ({}) => {
  const { id } = useParams();
  const { data } = useInboxById(id, true);
  console.log(
    client.getQueriesData<IInbox[]>(QUERY_MY_INBOX_EMAIL_FROM_CONTACTS)
  );
  return (
    <div>
      <InboxHeader email={data[0]} />
      <div
        style={{
          padding: '20px',
        }}
      >
        {ReactHtmlParser(data[0].body)}
      </div>
    </div>
  );
};

export default EmailContent;
