import { useHover } from '@mantine/hooks';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { CreateModal } from '@components/modal/create-modal';
import { useToggle } from '@hooks/useToggle';
import { Form, Input } from 'antd';

export const IconLost = () => {
  const { hovered, ref } = useHover();
  const [isVisible, toggleModal] = useToggle();
  const handleSubmit = (record: any) => {
    console.log(record);
  }
  return (
    <>
      <div ref={ref}>
        {hovered ?
          <FrownOutlined
            onClick={toggleModal}
            style={{
              fontSize: 18,
              cursor: 'pointer'
            }} /> :
          <SmileOutlined style={{ fontSize: 18 }} />
        }
      </div>
      <CreateModal
        width={500}
        bodyStyle={{ height: '200px' }}
        title='Opportunity Lost'
        isOpenModal={isVisible}
        toggleCreateModal={toggleModal}
        callback={handleSubmit}
      >
        <Form.Item
          name="failureReason"
          label="Failure reason"
          required
        >
          <Input.TextArea maxLength={150} showCount rows={5} />
        </Form.Item>
      </CreateModal>
    </>
  )
}
