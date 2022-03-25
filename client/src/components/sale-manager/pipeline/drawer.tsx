import { imagePlaceHolderUrl } from '@constance/image';
import { useSaleAccounts } from '@modules/account/get/account.get';
import { useQueryAllContacts } from '@modules/contact/query/contact.get';
import { useCourses } from '@modules/course/query/course.get';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import {
  GET_STAGES,
  useStages,
} from '@modules/pipeline-column/query/pipeline-column.get';
import { useCreatePipelineItemForManager } from '@modules/pipeline-items/mutation/pipeline-items.post';
import { ICreatePipelineItemForManager } from '@modules/pipeline-items/dto/create-pipeline-items.dto';
import {
  Avatar,
  Badge,
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  notification,
} from 'antd';

import { CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import { client } from '../../../App';

interface CreateOpportunityProps {
  visible: boolean;
  toggle: () => void;
  column: Partial<IPipelineColumn>;
}

export const CreateOpportunity: React.FC<CreateOpportunityProps> = ({
  toggle,
  visible,
  column,
}) => {
  const { data } = useStages();
  const { data: sales } = useSaleAccounts();
  const { data: contacts } = useQueryAllContacts();
  const { data: courses } = useCourses();
  const { mutate } = useCreatePipelineItemForManager();
  const onClose = () => {
    toggle();
  };
  const [form] = Form.useForm();
  const handleSubmit = (value: any) => {
    const { courseId, quantity, expectedClosing, ...rest } = value;
    const payload: ICreatePipelineItemForManager = {
      ...rest,
      expectedClosing: `${moment(expectedClosing).year()}-${moment(
        expectedClosing
      ).month()}-${moment(expectedClosing).date()}`,
      opportunityRevenue: {
        courseId,
        quantity: Number.parseInt(quantity),
      },
    };
    mutate(payload, {
      onSuccess: () => {
        notification.success({
          message: 'Success',
          description: 'New deal has been created successfully',
          icon: <CheckOutlined color='' />,
          onClick: () => {},
        });
        client.invalidateQueries(GET_STAGES);
        onClose();
      },
      onError: () => {
        notification.success({
          message: 'Failed',
          description: "Opportunity's creation failed",
          icon: <CheckOutlined color='' />,
          onClick: () => {},
        });
        onClose();
      },
    });
    // mutate(payload);
  };
  return (
    <>
      <Drawer
        title='Create a new account'
        width={720}
        onClose={onClose}
        visible={visible}
        destroyOnClose
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => form.submit()} type='primary'>
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='name'
                label='Name'
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder='Please enter user name' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='priority' label='Priority' initialValue={1}>
                <Select>
                  <Select.Option value={2}>
                    <Badge color={'red'} text='Important' />
                  </Select.Option>
                  <Select.Option value={1}>
                    <Badge color={'yellow'} text='Medium' />
                  </Select.Option>
                  <Select.Option value={0}>
                    <Badge color={'blue'} text='Low' />
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='contactId'
                label='From contact'
                rules={[{ required: true, message: 'Please select a contact' }]}
              >
                <Select
                  showSearch
                  placeholder='Select a contact'
                  filterOption={(input, option) => {
                    return option.children
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {contacts
                    ?.filter((item, index) => index < 5)
                    .map((contact) => (
                      <Select.Option key={contact.id} value={contact.id}>
                        {contact.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='columnId'
                label='Stage'
                rules={[{ required: true, message: 'Please choose the type' }]}
                initialValue={column.id}
              >
                <Select
                  showSearch
                  placeholder='Select a contact'
                  filterOption={(input, option) => {
                    return option.children
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {data?.map((stage) => (
                    <Select.Option key={stage.id} value={stage.id}>
                      {stage.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='accountId'
                label='Opportunity owner'
                rules={[
                  {
                    required: true,
                    message: 'Please choose the sale to handle this deal',
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder='Select a contact'
                  filterOption={(input, option) => {
                    return option.children
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {sales?.map((sale) => (
                    <Select.Option key={sale.id} value={sale.id}>
                      <Avatar
                        size={'small'}
                        src={sale.photo ? sale.photo : imagePlaceHolderUrl}
                        style={{
                          marginRight: 10,
                        }}
                        alt={sale.name}
                      />
                      {sale.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='expectedClosing'
                label='Expected closing'
                rules={[{ required: true, message: 'Please pick the date' }]}
              >
                <DatePicker.MonthPicker
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider
            orientation='center'
            style={{
              opacity: 0.5,
            }}
          >
            Product
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='courseId'
                label='Course'
                initialValue={courses.length > 0 && courses[0].id}
                rules={[{ required: true, message: 'Please choose a course' }]}
              >
                <Select
                  showSearch
                  placeholder='Select a course'
                  filterOption={(input, option) => {
                    return option.children
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {courses
                    ?.filter((_item, index) => index < 5)
                    .map((course) => (
                      <Select.Option key={course.id} value={course.id}>
                        {course.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='quantity'
                label='Quantity'
                rules={[
                  {
                    required: true,
                    message: 'Please provided expected number of products',
                  },
                ]}
              >
                <Input type='number' />
              </Form.Item>
            </Col>
          </Row>

          <Divider
            orientation='center'
            style={{
              opacity: 0.5,
            }}
          >
            Description
          </Divider>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name='description' label='Description'>
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
