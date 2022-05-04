import { IAccount } from '@interfaces/account';
import { useActivityTypes } from '@modules/activity/query/activity.get';
import { useMyPipelineItems } from '@modules/pipeline-items/query/pipeline-item.get';
import { useCreateSchedule } from '@modules/schedule/mutation/schedule.post';
import { QUERY_TEAM_WITH_TASK } from '@modules/team/query/team.get';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { client } from '../../App';

interface CreateScheduleDrawerProps {
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  currentAccount?: IAccount;
  setCurrentAccount?: Dispatch<SetStateAction<IAccount>>;
}

const { Option } = Select;

export const CreateScheduleDrawer: React.FC<CreateScheduleDrawerProps> = ({
  isVisible,
  setVisible,
  currentAccount,
  setCurrentAccount,
}) => {
  const [form] = Form.useForm();

  const { mutate } = useCreateSchedule();
  const handleSubmit = (value: any) => {
    mutate(
      {
        ...value,
        accountId: currentAccount.id,
        dueDate: value.dueDate.toDate(),
        isDone: false,
      },
      {
        onSettled: () => {
          setVisible(false);
          setCurrentAccount(undefined);
          client.invalidateQueries([QUERY_TEAM_WITH_TASK]);
          form.resetFields();
        },
      }
    );
  };

  const { data: activityTypes } = useActivityTypes(false);
  const { data: pipelineItems } = useMyPipelineItems(currentAccount?.id);
  return (
    <>
      <Drawer
        onClose={() => setVisible(false)}
        title={`Create a new task for ${currentAccount?.firstName} ${currentAccount?.lastName}`}
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
          hideRequiredMark
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
