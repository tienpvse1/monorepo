import { isPhoneNumber, isEmail, isRequired } from '@constance/rules-of-input-antd';
import { IContact } from '@modules/contact/entity/contact.entity';
import { useContacts } from '@modules/contact/query/contact.get';
import { usePostPipelineItems } from '@modules/pipeline-items/mutation/pipeline-items.post';
import { Button, Card, Form, Input, Select } from 'antd';
import { FC } from 'react';
const { Option } = Select;

interface CreateCardItemProps {
  pipelineColumnID: string;
  toggleClose: () => void;
}

export const CreateCardItem: FC<CreateCardItemProps> = ({ pipelineColumnID, toggleClose }) => {

  const { createPipelineItems } = usePostPipelineItems();
  const { data } = useContacts();

  const [form] = Form.useForm<IContact>();


  const handleSubmit = (value) => {
    //TODO: this createPipelineItems is still comment code -> pending api update field contact id
    // createPipelineItems(
    //   {
    //     name: value.transition,
    //     pipelineColumnId: pipelineColumnID
    //   }
    // )

    console.log({
      ...value,
      pipelineColumnId: pipelineColumnID
    });

    toggleClose();
  }

  const handleSelect = (contactIdSelected: string) => {
    const contactSelected = data?.find((contact) => { return contact.id == contactIdSelected })
    form.setFieldsValue({
      email: contactSelected.email,
      mobile: contactSelected.mobile,
      name: `${contactSelected.name}'s opportunity`
    })
  }

  return (
    <>
      <Card
        style={{
          width: '100%',
          marginTop: '10px',
          height: 500,
          borderRadius: 5,
          boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Form
          className="mini-form-create-items"
          form={form}
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="contactId"
            label="Organization / Contact"
          >
            <Select
              showSearch
              onSelect={(contactID: string) => handleSelect(contactID)}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              {data?.map((contact) => (<Option key={contact.id} value={`${contact.id}`}>{contact.name}</Option>))}
            </Select>

          </Form.Item>

          <Form.Item
            label="Opportunity"
            name="name"
            required
            rules={[isRequired('Please input opportunity name!')]}
          >
            <Input placeholder="Opportunity name..." />
          </Form.Item>

          <Form.Item label="Email" rules={[isEmail]} name="email">
            <Input />
          </Form.Item >

          <Form.Item label="Mobile" rules={[isPhoneNumber]} name="mobile">
            <Input />
          </Form.Item>

          {/* //TODO: this Product Revenue is still no data */}
          <Form.Item label="Product Revenue" name="amount">
            <Select>

            </Select>
          </Form.Item>

          <Button htmlType="submit" type="primary">Save</Button>
          <Button onClick={toggleClose} style={{ marginLeft: '15px' }}>Cancel</Button>

        </Form>
      </Card>
    </>
  );
};
