import { List, Avatar } from 'antd';
const data = [
  {
    icon: 'https://joeschmoe.io/api/v1/random',
    title: 'Ant Design Title 1',
    description: '',
    day: 4,
  },
  {
    icon: 'https://joeschmoe.io/api/v1/random',
    title: 'Ant Design Title 2',
    description: '',
    day: 4,
  },
  {
    icon: 'https://joeschmoe.io/api/v1/random',
    title: 'Ant Design Title 3',
    description: '',
    day: 4,
  },
  {
    icon: 'https://joeschmoe.io/api/v1/random',
    title: 'Ant Design Title 4',
    description: '',
    day: 4,
  },
];
export const ListNotify = () => {
  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.icon} />}
            title={<>{item.title}</>}
            description={
              <>
                <span>{item.description}</span>
                <span>{item.day} minutes ago</span>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
};
