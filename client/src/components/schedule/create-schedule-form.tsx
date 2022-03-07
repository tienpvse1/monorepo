import { PUBLIC_USER_INFO } from '@constance/cookie';
import { DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import { useCookies } from 'react-cookie';

export const CreateScheduleForm = () => {
  const [
    {
      public_user_info: { id, firstName },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  return (
    <div style={{ padding: '14px' }}>
      <Form.Item name='type' initialValue={'todo'} label='Activity Type'>
        <Select style={{ width: '100%' }}>
          <Select.Option value='todo'>Todo</Select.Option>
          <Select.Option value='email'>Email</Select.Option>
          <Select.Option value='call'>Call</Select.Option>
          <Select.Option value='meeting'>Meeting</Select.Option>
          <Select.Option value='upload-document'>Upload document</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name='summary' label='Summary'>
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name='dueDate'
        initialValue={moment(new Date(), 'YYYY-MM-DD HH:mm')}
        label='Due Date'
      >
        <DatePicker
          format='YYYY-MM-DD HH:mm'
          showTime
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item name='accountId' initialValue={id} label='Assigned to'>
        <Select disabled style={{ width: '100%' }}>
          <Select.Option value={id}>{firstName}</Select.Option>
        </Select>
      </Form.Item>
    </div>
  );
};
