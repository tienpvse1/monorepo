import { PUBLIC_USER_INFO } from '@constance/cookie';
import { IAccount } from '@interfaces/account';
import { useAccountById } from '@modules/account/get/account.get';
import { Button, List, PageHeader, Table, Typography } from 'antd';
import { useCookies } from 'react-cookie';

const { Column } = Table;
const AssignTaskForLeader = ({}) => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: account } = useAccountById(id);
  return (
    <>
      <PageHeader
        className='site-page-header'
        onBack={() => null}
        title='Task'
        subTitle='assign task to teammate'
      />
      <Table
        expandable={{
          expandedRowRender: ({ schedules }) => (
            <List
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={schedules}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>[{item.type}]</Typography.Text>{' '}
                  {item.summary}
                </List.Item>
              )}
            />
          ),
          rowExpandable: ({ schedules }) => schedules && schedules.length > 0,
        }}
        rowKey={(row) => row.id}
        dataSource={account.team.accounts}
      >
        <Column
          title='NO.'
          key='no'
          render={(_, _record, index) => <span>{index}</span>}
        />
        <Column
          key='name'
          title='Name'
          render={(_, record: IAccount) => (
            <span>
              {record.firstName} {record.lastName}
            </span>
          )}
        />
        <Column key='email' title='Email' dataIndex='email' />
        <Column
          key='actions'
          title='Actions'
          render={() => <Button>Add task</Button>}
        />
      </Table>
    </>
  );
};
export default AssignTaskForLeader;
