import { ITag } from '@modules/tag/entity/tag.entity';
import { useDeleteTag } from '@modules/tag/mutation/tag.delete';
import { QUERY_TAGS, useTags } from '@modules/tag/query/tag.get';
import { Button, Table, Tag } from 'antd';
import { client } from '../../App';

interface TableProps {}

export const TagTable: React.FC<TableProps> = () => {
  const { data } = useTags();
  const { mutate } = useDeleteTag();
  const handleDeleteTag = (id: string) => {
    return () =>
      mutate(id, {
        onSettled: () => {
          client.invalidateQueries(QUERY_TAGS);
        },
      });
  };
  return (
    <div>
      <Table dataSource={data} rowKey={(tag) => tag.id}>
        <Table.Column title='Name' dataIndex='name' key='name' />
        <Table.Column
          title='Preview'
          align='center'
          render={(_text, record: ITag) => (
            <Tag color={record.color}>{record.name}</Tag>
          )}
          key='color'
        />
        <Table.Column
          title='Contacts count'
          key='contactCount'
          align='center'
          render={(_text, record: ITag) => (
            <span>{record.contacts.length}</span>
          )}
        />
        <Table.Column
          align='center'
          title='Action'
          key='action'
          render={(_text: string, record: ITag) => (
            <Button onClick={handleDeleteTag(record.id)} danger>
              Remove
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
