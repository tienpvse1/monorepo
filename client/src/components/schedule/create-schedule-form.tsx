import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useActivityTypes } from '@modules/activity/query/activity.get';
import { DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import { useCookies } from 'react-cookie';

export const CreateScheduleForm = () => {
  const [
    {
      public_user_info: { id, firstName },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data: type } = useActivityTypes(false);
  return (
    <div style={{ padding: '14px' }}>
      {type && (
        <Form.Item
          name='activityTypeId'
          initialValue={[type[0].id]}
          label='Activity Type'
        >
          <Select style={{ width: '100%' }}>
            {type?.map((item) => (
              <Select.Option key={item.id}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}

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
