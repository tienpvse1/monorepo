import { useSaleAccounts } from '@modules/account/get/account.get';
import { useAssignAccount } from '@modules/pipeline-items/mutation/pipeline-item.patch';
import { Form, Modal, Select } from 'antd';
import { useState } from 'react';
import '../../stylesheets/account-list.css';
interface AccountListProps {
  visible: boolean;
  toggle: () => void;
  itemId: string;
}

export const AccountList: React.FC<AccountListProps> = ({
  toggle,
  itemId,
  visible,
}) => {
  const { data } = useSaleAccounts();
  const { mutate } = useAssignAccount();
  const [form] = Form.useForm();
  const onFinish = (e: any) => {
    mutate({
      accountId: e.sales,
      id: itemId,
    });
    toggle();
  };
  const [result, setResult] = useState<
    {
      id: string;
      name: string;
      photo: string;
    }[]
  >([]);
  const handleSearch = (value: string) => {
    const searchResult = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setResult(searchResult);
  };

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
          <Select
            showSearch
            placeholder='Select a person'
            optionFilterProp='children'
            onSearch={handleSearch}
          >
            {result.map((item, index) => (
              <Select.Option key={index} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Modal>
    </Form>
  );
};
