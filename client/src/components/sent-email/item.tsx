import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useMySentEmailsById } from '@modules/email/query/email.query';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { SentHeader } from './header';
interface SentItemProps {}

const SentItem: React.FC<SentItemProps> = ({}) => {
  const { id } = useParams();
  const [
    {
      public_user_info: { id: accountId },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data } = useMySentEmailsById(accountId, id, true);
  return (
    <div>
      <SentHeader email={data[0]} />
      <div
        style={{
          padding: '20px',
        }}
        dangerouslySetInnerHTML={{ __html: data[0].body }}
      ></div>
    </div>
  );
};

export default SentItem;
