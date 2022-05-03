import { Is } from '@common/is';
import { IAccount } from '@interfaces/account';
import {
  QUERY_ALL_ACCOUNTS,
  useAccounts,
} from '@modules/account/get/account.get';
import { useChangeAccountState } from '@modules/account/mutation/account.patch';
import { Avatar, Button, Table, Tag } from 'antd';
import moment from 'moment';
import { client } from '../../../App';

const { Column } = Table;
interface AccountTableProps {}

export const AccountTable: React.FC<AccountTableProps> = ({}) => {
  const { data, isLoading } = useAccounts();
  const { mutate } = useChangeAccountState();

  const handleChangeState = (
    state: 'disable' | 'enable' = 'enable',
    id: string
  ) => {
    mutate(
      {
        state,
        id,
      },
      {
        onSettled: () => {
          client.invalidateQueries(QUERY_ALL_ACCOUNTS);
        },
      }
    );
  };
  return (
    <div>
      <Is condition={Boolean(data)}>
        <Table loading={isLoading} dataSource={data} rowKey={(row) => row.id}>
          <Column
            title='Photo'
            key='birth'
            render={(_text, record: IAccount) => (
              <Avatar size={'large'} src={record.photo} />
            )}
          />
          <Column
            title='Name'
            key='name'
            render={(_text, record: IAccount) => (
              <span>
                {record.firstName} {record.lastName}
              </span>
            )}
          />
          <Column
            title='Role'
            key='role'
            render={(_text, record: IAccount) => (
              <span>{record.role?.name}</span>
            )}
          />
          <Column
            title='Created at'
            key='status'
            render={(_text, record: IAccount) => (
              <span>{moment(record.createdAt).format('DD MMMM YYYY')}</span>
            )}
          />
          <Column
            title='Status'
            align='center'
            key='status'
            render={(_text, record: IAccount) =>
              record.isEnable ? (
                <Tag color={'green'}>enabled</Tag>
              ) : (
                <Tag color={'error'}>disabled</Tag>
              )
            }
          />
          <Column
            title='Action'
            key='action'
            align='center'
            render={(text, record: IAccount) => (
              <>
                {record.isEnable ? (
                  <Button
                    danger
                    onClick={() => handleChangeState('disable', record.id)}
                  >
                    Disable
                  </Button>
                ) : (
                  <Button
                    type='primary'
                    onClick={() => handleChangeState('enable', record.id)}
                  >
                    Enable
                  </Button>
                )}
              </>
            )}
          />
        </Table>
      </Is>
    </div>
  );
};
