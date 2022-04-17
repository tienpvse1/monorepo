import { SelectBoxCourse } from '@components/course/select-box-Course';
import { isRequired, isRevenue } from '@constance/rules-of-input-antd';
import { ICreatePipelineItemsDto } from '@modules/pipeline-items/dto/create-pipeline-items.dto';
import { useCreateNewItems } from '@modules/pipeline-items/mutation/pipeline-items.post';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { Button, Card, Form, Input, InputNumber } from 'antd';
import { FC } from 'react';
import { useQueryClient } from 'react-query';
import { SelectBoxGroup } from './select-box-group';

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
  courseId: string;
  pipelineColumnId: string;
  expectedRevenue: number;
}

export const CreateCardItem: FC<CreateCardItemProps> = ({
  pipelineColumnID,
  toggleClose,
}) => {
  const { mutate: createNewItems } = useCreateNewItems();
  const [form] = Form.useForm<SubmittedObject>();
  const queryClient = useQueryClient();


  const handleSubmit = (value: SubmittedObject) => {
    const { quantity, courseId, name, contactId, expectedRevenue } = value;
    const data: ICreatePipelineItemsDto = {
      columnId: pipelineColumnID,
      contactId,
      name,
      expectedRevenue: expectedRevenue ? Number(expectedRevenue) : 0,
      opportunityRevenue: {
        courseId,
        quantity
      }
    };
    createNewItems(data, {
      onSuccess: () => {
        queryClient.refetchQueries(GET_PIPELINE_DESIGN);
        queryClient.invalidateQueries(GET_PIPELINE_DESIGN);
        toggleClose();
      },
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

          <SelectBoxGroup />

          <Form.Item
            label='Opportunity'
            name='name'
            required
            rules={[isRequired('Please input opportunity name!')]}
          >
            <Input placeholder='Opportunity name...' />
          </Form.Item>

          <SelectBoxCourse />
          <Input.Group compact>
            <Form.Item
              name="expectedRevenue"
              label="Expected Revenue"
              style={{ width: 'calc(70% - 10px)', marginRight: '10px' }}
              rules={[isRevenue]}
            >
              <Input suffix={"đ"} style={{ height: '40px', borderRadius: '5px' }} />
            </Form.Item>

            <Form.Item
              label='Quantity'
              rules={[{ type: 'number', min: 1, max: 99 }]}
              name='quantity'
              initialValue={1}
              style={{ width: '30%' }}
            >
              <InputNumber style={{ width: '100%' }} className='my-input-number' />
            </Form.Item>
          </Input.Group>
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
