import { SelectBoxCourse } from '@components/course/select-box-Course';
import { isRequired } from '@constance/rules-of-input-antd';
import { useSendEmail } from '@modules/email/mutate/email.post';
import { ICreatePipelineItemsDto } from '@modules/pipeline-items/dto/create-pipeline-items.dto';
import { useCreateNewItems } from '@modules/pipeline-items/mutation/pipeline-items.post';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { Button, Card, Form, Input, message } from 'antd';
import { FC } from 'react';
import { useQueryClient } from 'react-query';
import { SelectBoxGroup } from './select-box-group';
import { templateEmailOrderInfo } from '@util/email-template';

// import { dateFormat } from '@constance/date-format';
// const { DEFAULT } = dateFormat;

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
  expectedClosing: any;
  contactEmail: string;
  contactName: string;
  contactPhone: string;
  companyName: string;
  companyEmail: string;
  companyCity: string;
  discountCode: number;
  courseName: string;
  coursePrice: number;
}

export const CreateCardItem: FC<CreateCardItemProps> = ({
  pipelineColumnID,
  toggleClose,
}) => {
  const { mutate: createNewItems } = useCreateNewItems();
  const [form] = Form.useForm<SubmittedObject>();
  const queryClient = useQueryClient();

  const onError = () => {
    message.error('Can not send email');
  }
  const { mutate: sendEmail } = useSendEmail(onError);

  const handleSubmit = (value: SubmittedObject) => {
    const {
      quantity, courseId, name, contactId, expectedRevenue, contactEmail,
      contactName, contactPhone, companyName, companyEmail, companyCity,
      discountCode, courseName, coursePrice
    } = value;

    const data: ICreatePipelineItemsDto = {
      priority: 1,
      columnId: pipelineColumnID,
      contactId,
      name,
      // expectedClosing: expectedClosing ? expectedClosing.format(DEFAULT) : '',
      expectedRevenue: expectedRevenue ? Number(expectedRevenue) * quantity : 0,
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
        message.success('Created successfully !')
        // sendEmail({
        //   subject: 'VJAA CRM - Confirm Order Information',
        //   to: [{ email: contactEmail, isTag: false }],
        //   value: templateEmailOrderInfo(
        //     'Order Information:',
        //     companyName,
        //     contactEmail,
        //     contactName,
        //     contactPhone,
        //     companyEmail,
        //     companyCity,
        //     discountCode,
        //     courseName,
        //     coursePrice,
        //     expectedRevenue,
        //     quantity)
        // })
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

          <SelectBoxGroup form={form} />

          <Form.Item
            label='Opportunity'
            name='name'
            required
            rules={[isRequired('Please input opportunity name!')]}
          >
            <Input placeholder='Opportunity name...' />
          </Form.Item>

          {/* <Form.Item
            name="expectedClosing"
            label="Close Date"
            required
            rules={[isRequired('Close Date is required')]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item> */}

          <SelectBoxCourse form={form} />

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
