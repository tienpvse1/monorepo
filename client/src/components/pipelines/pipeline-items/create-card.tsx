import { SelectBoxCourse } from '@components/course/select-box-Course';
import { isRequired } from '@constance/rules-of-input-antd';
import { ICreatePipelineItemsDto } from '@modules/pipeline-items/dto/create-pipeline-items.dto';
import { usePostPipelineItems } from '@modules/pipeline-items/mutation/pipeline-items.post';
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
}

export const CreateCardItem: FC<CreateCardItemProps> = ({
  pipelineColumnID,
  toggleClose,
}) => {
  const { mutate: createNewItems } = usePostPipelineItems();
  const [form] = Form.useForm<SubmittedObject>();
  const queryClient = useQueryClient();

  const handleSubmit = (value: SubmittedObject) => {
    const { quantity, courseId, name, contactId } = value;
    const data: ICreatePipelineItemsDto = {
      columnId: pipelineColumnID,
      contactId,
      name,
      opportunityRevenue: {
        courseId,
        quantity
      }
    };
    createNewItems(data, {
      onSuccess: () => {
        queryClient.refetchQueries(GET_PIPELINE_DESIGN);
        console.log("refecth:", GET_PIPELINE_DESIGN);
        
        toggleClose();
      },
    });
  };

  // const handleSelect = (contactIdSelected: string) => {
  //   const contactSelected = data?.find((contact) => {
  //     return contact.id == contactIdSelected;
  //   });

  //   form.setFieldsValue({
  //     name: `${contactSelected.name}'s opportunity`
  //   });
  // };

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

          <Form.Item
            label='Expected sold quantity'
            rules={[{ type: 'number', min: 1, max: 99 }]}
            name='quantity'
            initialValue={1}
          >
            <InputNumber className='my-input-number' />
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
