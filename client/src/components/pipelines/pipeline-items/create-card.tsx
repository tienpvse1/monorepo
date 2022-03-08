import { PUBLIC_USER_INFO } from '@constance/cookie';
import {
  isEmail,
  isPhoneNumber,
  isRequired,
} from '@constance/rules-of-input-antd';
import { IContact } from '@modules/contact/entity/contact.entity';
import { useUpdateContact } from '@modules/contact/mutation/contact.patch';
import { useContacts } from '@modules/contact/query/contact.get';
import { ICreatePipelineItemsDto } from '@modules/pipeline-items/dto/create-pipeline-items.dto';
import { usePostPipelineItems } from '@modules/pipeline-items/mutation/pipeline-items.post';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { useQueryProducts } from '@modules/product/query/products.get';
import { Button, Card, Form, Input, Select } from 'antd';
import { FC, useState } from 'react';
import { useCookies } from 'react-cookie';
import { client } from '../../../App';
const { Option } = Select;

interface CreateCardItemProps {
  pipelineColumnID: string;
  toggleClose: () => void;
}
interface SubmittedObject {
  contactId: string;
  name: string;
  email: string;
  mobile?: any;
  quantity: number;
  productId: string;
  pipelineColumnId: string;
}

export const CreateCardItem: FC<CreateCardItemProps> = ({
  pipelineColumnID,
  toggleClose,
}) => {
  const { mutate: createNewItems } = usePostPipelineItems();

  const { mutate: updateContact } = useUpdateContact();
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data } = useContacts(id);
  const { data: products } = useQueryProducts();

  const [infoContact, setInfoContact] = useState<IContact>();

  const [form] = Form.useForm<SubmittedObject>();

  const handleSubmit = (value: SubmittedObject) => {
    const { quantity, productId, name, contactId, email, mobile } = value;
    const data: ICreatePipelineItemsDto = {
      columnId: pipelineColumnID,
      contactId,
      name,
      opportunityRevenue: {
        productId,
        quantity,
      },
    };
    createNewItems(data, {
      onSuccess: () => {
        if (infoContact.email !== email || infoContact.mobile !== mobile) {
          updateContact({
            id: infoContact.id,
            email,
            mobile,
          });
        }
        toggleClose();
        client.invalidateQueries(GET_PIPELINE_DESIGN);
      },
    });
  };

  const handleSelect = (contactIdSelected: string) => {
    const contactSelected = data?.find((contact) => {
      return contact.id == contactIdSelected;
    });

    setInfoContact(contactSelected);

    form.setFieldsValue({
      email: contactSelected.email,
      mobile: contactSelected.mobile,
      name: `${contactSelected.name}'s opportunity`,
    });
  };

  return (
    <>
      <Card
        style={{
          width: '100%',
          marginTop: '10px',
          minHeight: 500,
          borderRadius: 5,
          boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.1)',
          paddingBottom: 20,
        }}
      >
        <Form
          className='mini-form-create-items'
          form={form}
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={(value) => handleSubmit(value)}
        >
          <Form.Item name='contactId' label='Organization / Contact'>
            <Select
              showSearch
              onSelect={(contactID: string) => handleSelect(contactID)}
              placeholder='Select a contact'
              optionFilterProp='children'
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {data?.map((contact) => (
                <Option key={contact.id} value={`${contact.id}`}>
                  {contact.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Opportunity'
            name='name'
            required
            rules={[isRequired('Please input opportunity name!')]}
          >
            <Input placeholder='Opportunity name...' />
          </Form.Item>

          <Form.Item label='Email' rules={[isEmail]} name='email'>
            <Input />
          </Form.Item>

          <Form.Item label='Mobile' rules={[isPhoneNumber]} name='mobile'>
            <Input />
          </Form.Item>

          {products && (
            <Form.Item
              label='Product Revenue'
              initialValue={products[0].id}
              name='productId'
            >
              <Select>
                {products.map((product) => (
                  <Option value={product.id} key={product.id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            label='Expected sold quantity'
            rules={[{ type: 'number', message: 'must be number' }]}
            name='quantity'
            initialValue={1}
          >
            <Input />
          </Form.Item>

          <Button htmlType='submit' type='primary'>
            Save
          </Button>
          <Button onClick={toggleClose} style={{ marginLeft: '15px' }}>
            Cancel
          </Button>
        </Form>
      </Card>
    </>
  );
};
