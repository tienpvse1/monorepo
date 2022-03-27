import { OpportunityTitleLost } from "@components/opportunity/opportunity-title-lost"
import { Avatar, List } from "antd"

const OpportunityLost = () => {
  return (
    <>
      <OpportunityTitleLost />
      <div className='container-page'>
        <List
          bordered
          // dataSource={data}
          // renderItem={item => (
          //   <List.Item key={'12354231'}>
          //     <List.Item.Meta
          //       avatar={<Avatar src={'https://joeschmoe.io/api/v1/random'} />}
          //       title={<a href="https://ant.design">Abraham</a>}
          //       description={'khwrwsh.slry@example.com'}
          //     />
          //     <div>Content</div>
          //   </List.Item>
          // )}
        >
          <List.Item key={'12354231'}>
            <List.Item.Meta
              title={<a href="https://ant.design">Abraham</a>}
              description={'khwrwsh.slry@example.com'}
            />
            <div>View Details</div>
          </List.Item>
          <List.Item key={'12354231'}>
            <List.Item.Meta
              title={<a href="https://ant.design">Abraham</a>}
              description={'khwrwsh.slry@example.com'}
            />
            <div>View Details</div>
          </List.Item>
        </List>
      </div>
    </>
  )
}

export default OpportunityLost