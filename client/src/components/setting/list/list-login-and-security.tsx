import { Button, List } from "antd"
const data = [
  {
    title: 'Account Password',
    description: `Current password strength: strong`,
    action: 'Change',
  },
  {
    title: 'Mobile Phone',
    description: 'Your phone: 138****8293',
    action: 'Change',
  },
  {
    title: 'Alternate Email',
    description: 'Registered email: ant***@gmail.com',
    action: 'Change',
  },
];
export const ListLoginAndSecurity = () => {
  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[<Button shape="round">{item.action}</Button>]}
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
