import { WrapperRowTitle } from '@components/layout/title-pages/wrapper-row-title'
import { Button, Table } from 'antd'
import Column from 'antd/lib/table/Column'

export const PipelineList = () => {
  const data = [
    {
      key: 1,
      name: `Adriana Jacobs`,
      description: 'this is descriptions',
      status: 'Open'
    }
  ]

  return (
    <>
      <WrapperRowTitle
        className="wrapper-title-page-2"
        title="Pipelines"
        titleSize="27px"
        children={<Button type='primary' className='button-ant-custom-style'>New pipeline</Button>}
      />
      <Table
        title={() => <>123</> }
        dataSource={data}
      >
        <Column title='Name' dataIndex='name' key='name'
          render={(a) => <span> {a} </span>}
        />
        <Column title='Description' dataIndex='description' key='description'
          render={(b) => <span> {b} </span>}
        />
        <Column title='Status' dataIndex='status' key='status'
          render={(c) => <span> {c} </span>}
        />
      </Table>
    </>
  )
}
