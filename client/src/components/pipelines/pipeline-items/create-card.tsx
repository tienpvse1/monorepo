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
import numberSeparator from "number-separator";

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
        sendEmail({
          subject: 'VJAA CRM - Confirm Order Information',
          to: [{ email: contactEmail, isTag: false }],
          value: `
          <div class="invoice-box" style="
			max-width: 800px;
			margin: auto;
			padding: 30px;
      padding-top: 0px;
			border: 1px solid #eee; 
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
			font-size: 16px;
			line-height: 24px;
			font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			color: #555;
		">
        <h1>Order Information:</h1>
        <table style="
					width: 100%;
			 		line-height: inherit;
			 		text-align: left;
			 		border-collapse: collapse;
	 			">
            <tr class="information">
                <td colspan="2" style="padding: 5px; vertical-align: top; padding-bottom: 40px;">
                    <table style="
										 width: 100%;
										 line-height: inherit;
										 text-align: left;
										 border-collapse: collapse;
									 ">
                        <tr>
                            <td>
                                Company name: ${companyName} <br /> Email company: ${companyEmail} <br /> City: ${companyCity}
                            </td>

                            <td>
                                Contact name: ${contactName} <br /> Email contact: ${contactEmail}<br /> Phone: ${contactPhone}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr class="heading" style=" background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;">
                <td style="padding: 5px; vertical-align: top; text-align: left;">Item</td>
                <td style="padding: 5px; vertical-align: top; text-align: center;">Quantity</td>
                <td style="padding: 5px; vertical-align: top; text-align: center;">Discount (%)</td>
                <td style="padding: 5px; vertical-align: top; text-align: right;">Price</td>
            </tr>

            <tr class="item" style="border-bottom: 1px solid #eee;">
                <td style="padding: 5px; vertical-align: top; text-align: left; width: 50%;">${courseName}</td>
                <td style="padding: 5px; vertical-align: top; text-align: center;">${quantity}</td>
                <td style="padding: 5px; vertical-align: top; text-align: center;">${discountCode * 100}%</td>
                <td style="padding: 5px; vertical-align: top; text-align: right;">${numberSeparator(coursePrice, '.')}vnd</td>
            </tr>

            <tr class="total" style=" border-top: 2px solid #eee;
            font-weight: bold;">
                <td style="padding: 5px; vertical-align: top;"></td>
                <td style="padding: 5px; vertical-align: top;"></td>
                <td style="padding: 5px; vertical-align: top;"></td>
                <td style="padding: 5px; vertical-align: top; text-align: right;">Total: ${numberSeparator((expectedRevenue * quantity), '.')}vnd</td>
            </tr>
        </table>
    </div>
          `
        }, {
          onSuccess: () => {
            message.success('Created successfully !')
          }
        })
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
