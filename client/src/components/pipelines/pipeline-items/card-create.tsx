import { usePostPipelineItems } from '@modules/pipeline-items/mutation/pipeline-items.post';
import { Button, Card, Form, Input } from 'antd';

interface CardCreateItemProps {
  pipelineColumnID: string;
  toggleClose: () => void;
}

export const CardCreateItem: React.FC<CardCreateItemProps> = ({
  pipelineColumnID,
  toggleClose,
}) => {
  const { createPipelineItems } = usePostPipelineItems();

  const handleSubmit = (value) => {
    createPipelineItems({
      name: value.transition,
      pipelineColumnId: pipelineColumnID,
    });

    toggleClose();
  };

  return (
    <>
      <Card
        style={{
          width: '100%',
          marginTop: '10px',
          height: 360,
          borderRadius: 5,
          boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Form
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={(value) => handleSubmit(value)}
        >
          <Form.Item
            name='transition'
            label='Name transition'
            rules={[
              { required: true, message: 'Please input transition name!' },
            ]}
          >
            <Input placeholder='transaction...' />
          </Form.Item>
          <Form.Item label='Field B'>
            <Input placeholder='input placeholder' />
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
