import { useSaleAccounts } from '@modules/account/get/account.get';
import { Form, Mentions, Modal } from 'antd';
import { useRef } from 'react';
import '../../../stylesheets/account-list.css';
interface AccountListProps {
  visible: boolean;
  toggle: () => void;
}

export const AccountList: React.FC<AccountListProps> = ({
  toggle,
  visible,
}) => {
  const { data, isLoading } = useSaleAccounts();
  const [form] = Form.useForm();
  const onFinish = (e: any) => console.log(e);
  return (
    <Form form={form} layout='horizontal' onFinish={onFinish}>
      <Modal
        title='Assign this opportunity to'
        visible={visible}
        style={{
          height: 300,
          paddingBottom: 150,
        }}
        destroyOnClose
        onCancel={() => toggle()}
        onOk={() => form.submit()}
      >
        <Form.Item
          name='sales'
          label='Sales'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Mentions
            loading={isLoading}
            style={{ width: '100%' }}
            // onSelect={onSelect}
            placeholder='Try typing @'
            onSelect={(e) => console.log(e)}
          >
            {data &&
              data.map((item) => (
                <Mentions.Option value={item.name} key={item.id}>
                  <img
                    src={item.photo}
                    width={30}
                    height={30}
                    alt={item.name}
                  />
                  <span
                    style={{
                      marginLeft: 8,
                    }}
                  >
                    {item.name}
                  </span>
                </Mentions.Option>
              ))}
          </Mentions>
        </Form.Item>
      </Modal>
    </Form>
  );
};
