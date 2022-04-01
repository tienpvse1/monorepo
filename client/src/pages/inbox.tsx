import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useMyInboxEmailsFromContacts } from '@modules/inbox/query/inbox.get';
import { Comment, List } from 'antd';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
interface InboxProps {}

const Inbox: React.FC<InboxProps> = ({}) => {
  const navigate = useNavigate();
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data } = useMyInboxEmailsFromContacts(id, true);
  const handleClick = (id: string) => {
    navigate(`/email/${id}`);
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
              actions={[<span>Reply</span>]}
              author={item.sender.name}
              avatar={item.sender.photo}
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

export default Inbox;
