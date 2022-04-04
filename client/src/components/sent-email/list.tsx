import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useMySentEmails } from '@modules/email/query/email.query';
import { Comment, List } from 'antd';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface ListSentEmailsProps {}

const ListSentEmails: React.FC<ListSentEmailsProps> = ({}) => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data } = useMySentEmails(id, true);
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/email/sent/${id}`);
  };
  return (
    <div>
      <List
        className='comment-list'
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
          <li
            style={{
              marginLeft: 50,
              cursor: 'pointer',
            }}
            onClick={() => handleClick(item.id)}
          >
            <Comment
              actions={[<span key={1}>Detail</span>]}
              author={'You'}
              avatar={item.account.photo}
              content={item.subject}
              datetime={
                <span>{moment(item.createdAt).format('DD MMMM YYYY')}</span>
              }
            />
          </li>
        )}
      />
    </div>
  );
};

export default ListSentEmails;
