import { useSaleAccounts } from '@modules/account/get/account.get';
import { useActivityTypes } from '@modules/activity/query/activity.get';
import { usePipelineItems } from '@modules/pipeline-items/query/pipeline-item.get';
import { useCreateSchedule } from '@modules/schedule/mutation/schedule.post';
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from 'antd';
import { Dispatch, SetStateAction } from 'react';
// import { client } from '../../../App';

interface CreateScheduleDrawerProps {
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const { Option } = Select;

export const CreateScheduleDrawer: React.FC<CreateScheduleDrawerProps> = ({
  isVisible,
  setVisible,
}) => {
  const [form] = Form.useForm();

  const { data: sales } = useSaleAccounts();
  const { mutate } = useCreateSchedule();
  const handleSubmit = (value: any) => {
    mutate(value, {
      onSuccess(data) {
        form.resetFields();
        setVisible(false);
        message.success('successfully add new schedule');
      },
    });
  };

  const { data: activityTypes } = useActivityTypes(false);
  const { data: pipelineItems } = usePipelineItems();
  return (
    <>
      <Drawer
        onClose={() => setVisible(false)}
        title={`Create a new task`}
        width={500}
        visible={isVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setVisible(false)}>Cancel</Button>
            <Button onClick={() => form.submit()} type='primary'>
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          onFinish={(value) => handleSubmit(value)}
          form={form}
          layout='vertical'
        >
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item
                name='summary'
                label='Name'
                rules={[
                  { required: true, message: 'Please enter task summary' },
                ]}
              >
                <Input placeholder='Please enter task summary' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item
                name='activityTypeId'
                label='Activity type'
                rules={[{ required: true, message: 'Please select type' }]}
              >
                <Select placeholder='Pick an activity type'>
                  {activityTypes?.map((type) => (
                    <Option key={type.id}>{type.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={22}>
              <Form.Item
                name='accountId'
                label="Opportunity's owner"
                rules={[
                  {
                    required: true,
                    message: "Please choose an opportunity's owner",
                  },
                ]}
              >
                <Select placeholder="Pick an opportunity's owner">
                  {sales?.map((item) => (
                    <Option key={item.id}>
                      <Avatar src={item.photo} /> {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item
                name='pipelineItemId'
                label='Target'
                rules={[
                  { required: true, message: 'Please choose an opportunity' },
                ]}
              >
                <Select placeholder='Pick an opportunity'>
                  {pipelineItems?.map((item) => (
                    <Option key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item
                name='dueDate'
                label='Due date'
                rules={[
                  { required: true, message: 'Please choose the due date' },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item
                name='note'
                label='Description'
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder='please enter url description'
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
