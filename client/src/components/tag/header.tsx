import { antColor } from '@constance/color';
import { useBooleanToggle } from '@mantine/hooks';
import { useCreateTag } from '@modules/tag/mutation/tag.post';
import { QUERY_TAGS } from '@modules/tag/query/tag.get';
import { Button, Form, Input, Modal, PageHeader, Select, Tag } from 'antd';
import { client } from '../../App';
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const [visible, toggle] = useBooleanToggle(false);
  const { mutate } = useCreateTag();
  const [form] = Form.useForm();
  const handleCreate = () => {
    return (value: any) => {
      mutate(
        { ...value },
        {
          onSettled: async () => {
            await client.invalidateQueries(QUERY_TAGS);
            form.resetFields();
            toggle();
          },
        }
      );
    };
  };
  return (
    <div>
      <Modal
        title='New tag'
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => toggle()}
      >
        <Form form={form} onFinish={handleCreate()}>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please give your tag a name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='Color' initialValue={'volcano'} name='color'>
            <Select>
              {antColor.map((color) => (
                <Select.Option key={color}>
                  <Tag color={color}>{color}</Tag>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <PageHeader
        className='site-page-header'
        onBack={() => history.back()}
        title='Tag'
        subTitle='Manage your tags'
        extra={
          <Button type='primary' onClick={() => toggle(true)}>
            Add tag
          </Button>
        }
      />
    </div>
  );
};
