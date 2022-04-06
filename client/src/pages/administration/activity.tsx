import { IActivityType } from '@modules/activity/entity/activity.entity';
import { useActivityTypes } from '@modules/activity/query/activity.get';
import { Button, Table } from 'antd';
import moment from 'moment';

const { Column } = Table;
interface ActivityProps {}

const Activity: React.FC<ActivityProps> = ({}) => {
  const { data } = useActivityTypes(true);
  return (
    <div>
      <Table dataSource={data} rowKey={(row) => row.id}>
        <Column
          title='No.'
          key='no'
          render={(_text, _record, index) => <span>{index}</span>}
        />
        <Column title='Name' dataIndex='name' key='name' />
        <Column
          title='Created at'
          key='createdAt'
          render={(_text, record: IActivityType) => (
            <span>{moment(record.createdAt).format('DD MMMM YYYY')}</span>
          )}
        />
        <Column
          title='Action'
          key='action'
          render={(_text, record: IActivityType) => <Button>Update</Button>}
        />
      </Table>
    </div>
  );
};

export default Activity;
