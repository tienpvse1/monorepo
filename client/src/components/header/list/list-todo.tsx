import { List, Tag } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
    description: '',
    day: 4,
    color: 'green',
  },
  {
    title: 'Ant Design Title 2',
    description: '',
    day: 4,
    color: 'red',
  },
  {
    title: 'Ant Design Title 3',
    description: '',
    day: 4,
    color: 'blue',
  },
  {
    title: 'Ant Design Title 4',
    description: '',
    day: 4,
    color: 'volcano',
  },
];
export const ListToDo = () => {
  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={
              <>
                <>{item.title}</>
                <Tag style={{ float: 'right' }} color={item.color}>
                  something
                </Tag>
              </>
            }
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
