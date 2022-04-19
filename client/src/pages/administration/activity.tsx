import { useBooleanToggle } from '@mantine/hooks';
import { IActivityType } from '@modules/activity/entity/activity.entity';
import { useCreateActivityType } from '@modules/activity/mutation/activity.post';
import {
  QUERY_ALL_ACTIVITY,
  useActivityTypes,
} from '@modules/activity/query/activity.get';
import { Button, Drawer, Form, Input, PageHeader, Table } from 'antd';
import moment from 'moment';
import { client } from '../../App';

const { Column } = Table;
interface ActivityProps {}

const Activity: React.FC<ActivityProps> = ({}) => {
  const { data } = useActivityTypes(true);
  const { mutate } = useCreateActivityType();
  const [isVisible, toggle] = useBooleanToggle(false);
  const [form] = Form.useForm();
  const handleFinish = (value: any) => {
    mutate(value, {
      onSettled: () => {
        client.refetchQueries(QUERY_ALL_ACTIVITY);
        toggle();
      },
    });
  };
  return (
    <div className='container-page'>
      <Drawer
        title='Add activity'
        placement='right'
        onClose={() => toggle()}
        visible={isVisible}
        width={500}
      >
        <Form
          layout='vertical'
          form={form}
          name='control-hooks'
          onFinish={handleFinish}
        >
          <Form.Item
            name='name'
            label='Activity name'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <Input.TextArea />
          </Form.Item>
          <Button onClick={() => form.submit()} type='primary'>
            Add
          </Button>
        </Form>
      </Drawer>
      <PageHeader
        className='site-page-header'
        onBack={() => null}
        title='Activity'
        subTitle='List of activity type sale can perform'
        extra={
          <Button onClick={() => toggle()} type='primary'>
            Add
          </Button>
        }
      />
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
