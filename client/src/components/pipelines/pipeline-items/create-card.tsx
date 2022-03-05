import {
  isEmail,
  isPhoneNumber,
  isRequired,
} from '@constance/rules-of-input-antd';
import { useContacts } from '@modules/contact/query/contact.get';
import { ICreatePipelineItemsDto } from '@modules/pipeline-items/dto/create-pipeline-items.dto';
import { usePostPipelineItems } from '@modules/pipeline-items/mutation/pipeline-items.post';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { useQueryProducts } from '@modules/product/query/products.get';
import { Button, Card, Form, Input, Select } from 'antd';
import { FC } from 'react';
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
  const { mutate } = usePostPipelineItems();
  const { data } = useContacts();
  const { data: products } = useQueryProducts();

  const [form] = Form.useForm<SubmittedObject>();

  const handleSubmit = (value: SubmittedObject) => {
    //TODO: this createPipelineItems is still comment code -> pending api update field contact id

    const { quantity, productId, name, contactId } = value;
    const data: ICreatePipelineItemsDto = {
      columnId: pipelineColumnID,
      contactId,
      name,
      opportunityRevenue: {
        productId,
        quantity,
      },
    };
    mutate(data, {
      onSuccess: () => {
        client.refetchQueries(GET_PIPELINE_DESIGN);
        toggleClose();
      },
    });
  };

  const handleSelect = (contactIdSelected: string) => {
    const contactSelected = data?.find((contact) => {
      return contact.id == contactIdSelected;
    });
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

          {/* //TODO: this Product Revenue is still no data */}
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
