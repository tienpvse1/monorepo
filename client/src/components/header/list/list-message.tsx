import { Avatar, List } from 'antd';

const data = [
  {
    avatar: 'https://i.pravatar.cc/100',
    title: 'Kien',
    description: 'Deadline toi ban oi',
    day: '4',
  },
  {
    avatar: 'https://i.pravatar.cc/300',
    title: 'Tien',
    description: 'bug too much',
    day: '4',
  },
  {
    avatar: 'https://i.pravatar.cc/200',
    title: 'MeiMei',
    description: 'em thich anh',
    day: '4',
  },
  {
    avatar: 'https://i.pravatar.cc/400',
    title: 'Katsumi',
    description: 'toi nay gangbang nhe',
    day: '4',
  },
];
export const ListMessage = () => {
  return (
    <div>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<>{item.title}</>}
              description={
                <>
                  <span>{item.description}</span> <br />
                  <span>{item.day} days ago</span>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
