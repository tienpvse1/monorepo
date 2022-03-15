import { FileTextOutlined } from '@ant-design/icons';
import { EditButtonHover } from '@components/page-details/edit-button-hover';
import { useToggle } from '@hooks/useToggle';
import { IContact } from '@modules/contact/entity/contact.entity';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useUpdatePipelineItem } from '@modules/pipeline-items/mutation/pipeline-items.update';
import { GET_PIPELINE_ITEM_BY_ID } from '@modules/pipeline-items/query/pipeline-item.get';
import { Alert, Button, Form, Input, message, Space } from 'antd';
import React from 'react'
import { useQueryClient } from 'react-query';

interface OpportunityNotesProps {
  data: IContact;
}

export const OpportunityNotes: React.FC<OpportunityNotesProps> = ({ data }) => {
  const [isEditingForm, toggleEditForm] = useToggle();
  const queryClient = useQueryClient();
  const { mutate: UpdateOpportunity } = useUpdatePipelineItem();

  const [form] = Form.useForm<IPipelineItem>();
  const handleToggleEdit = () => {
    toggleEditForm();
    form.setFieldsValue({
      internalNotes: data.internalNotes
    })
  }

  const handleToggleSubmit = async () => {
    const value = await form.validateFields();
    try {
      UpdateOpportunity({
        id: data.id,
        internalNotes: value.internalNotes
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(GET_PIPELINE_ITEM_BY_ID);
          message.success('Saved successfully !');
          toggleEditForm();
        }
      })
    } catch (error) {
      
    }
  }

  return (
    <Form form={form}>
      {isEditingForm ? (
        <>
          <Alert
            message="Internal Notes"
            showIcon
            icon={<FileTextOutlined />}
            description={
              <Form.Item
                style={{ borderBottom: '1px solid black' }}
                name="internalNotes"
              >
                <Input.TextArea showCount maxLength={150} autoFocus bordered={false} />
              </Form.Item>
            }
            type="warning"
          />
          <Space style={{ paddingTop: '15px', float: 'right' }}>
            <Button onClick={() => handleToggleSubmit()} type='primary'>
              Save
            </Button>
            <Button onClick={toggleEditForm}>Cancel</Button>
          </Space>
        </>
      ) :
        <EditButtonHover toggleEditForm={handleToggleEdit}>
          <Alert
            message="Internal Notes"
            showIcon
            icon={<FileTextOutlined />}
            description={`${data.internalNotes || 'No notes have been recorded yet'}`}
            type="warning"
          />
        </EditButtonHover>
      }
    </Form>
  )
}
