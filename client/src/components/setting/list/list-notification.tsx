import { List, Switch } from "antd"
const data = [
  {
    title: 'Received message',
    description: `Received message`,
    action: '',
  },
  {
    title: 'Received mail',
    description: 'Received mail',
    action: '',
  },
  {
    title: 'Alternate Email',
    description: 'Registered email: ant***@gmail.com',
    action: 'Change',
  },
];
export const ListNotification = () => {
  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[<Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
          ]}
        >
          <List.Item.Meta
            title={<>{item.title}</>}
            description={
              <>
                <span>{item.description}</span>
              </>
            }
          />
        </List.Item>
      )}
    />
  )
}
