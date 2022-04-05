import { IAccount } from '@interfaces/account';
import { ITeam } from '@modules/team/entity/team.entity';
import { useDeleteTeam } from '@modules/team/mutate/team.delete';
import { Button, Image, Table as AntdTable, Tag, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
interface TableProps {
  data: ITeam[];
  setReload: () => void;
}

export const Table: React.FC<TableProps> = ({ data, setReload }) => {
  const { mutate: removeTeam } = useDeleteTeam();

  const columns: ColumnsType<ITeam> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Statistic',
      key: 'statistic ',
      render: (_, record) => (
        <span>
          {record.accounts.length}/{record.required}
        </span>
      ),
    },
    {
      title: 'Created date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => <span>{new Date(value).toLocaleDateString()}</span>,
    },
    {
      title: 'Action',
      key: 'operation',
      render: (_, record) =>
        <Button disabled={(record.accounts.length > 0) && true} type='link' onClick={() => removeTeam(record.id, {
          onSuccess: () => {
            message.success('Remove team successfully');
            setReload();
          }
        })}>
          Remove
        </Button>
    },
  ];

  const expandedRowRender = (data: ITeam) => {
    const nestedColumns: ColumnsType<IAccount> = [
      {
        title: 'Name',
        key: 'name',
        render: (_, record) => (
          <span>
            {record.firstName} {record.lastName}
          </span>
        ),
      },
      {
        title: 'Email',
        key: 'state',
        dataIndex: 'email',
      },
      {
        title: 'Position',
        key: 'position',
        render: () => (
          <span>
            <Tag color={'blue'}>Sale</Tag>
          </span>
        ),
      },
      {
        title: 'Country',
        key: 'country',
        render: () => (
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg'
            height={30}
            width={50}
          />
        ),
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className='table-operation'>
            <Button type='default'>Assign</Button>
          </span>
        ),
      },
    ];

    return (
      <AntdTable
        columns={nestedColumns}
        dataSource={data.accounts}
        pagination={false}
      />
    );
  };
  return (
    <div>
      <AntdTable
        className='components-table-demo-nested'
        dataSource={data}
        rowKey={(record) => record.id}
        columns={columns}
        expandedRowRender={(record) => expandedRowRender(record)}
      />
    </div>
  );
};
