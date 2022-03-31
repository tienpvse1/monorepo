import { useHover } from '@mantine/hooks';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { CreateModal } from '@components/modal/create-modal';
import { useToggle } from '@hooks/useToggle';
import { Form, Input, message } from 'antd';
import { useCreateReason } from '@modules/reason/mutation/reason.post';
import { useLoseOpportunity } from '@modules/pipeline-items/mutation/pipeline-item.patch';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useQueryClient } from 'react-query';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';

interface IconLostProps {
  cardData: IPipelineItem;
}

export const IconLost: React.FC<IconLostProps> = ({
  cardData
}) => {
  const { hovered, ref } = useHover();
  const [isVisible, toggleModal] = useToggle();
  const { mutate: createReason } = useCreateReason();
  const { mutate: loseOpportunity } = useLoseOpportunity();
  const queryClient = useQueryClient();
  const handleSubmit = (record: any) => {
    loseOpportunity({ id: cardData.id }, {
      onSuccess: () => {
        createReason({
          ...record,
          pipelineItemId: cardData.id,
          reasonType: 'lose'
        })
        queryClient.refetchQueries(GET_PIPELINE_DESIGN);
        message.success('Lost opportunity success!')
      }
    })
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
        bodyStyle={{ height: '250px' }}
        title='Lost Opportunity'
        isOpenModal={isVisible}
        toggleCreateModal={toggleModal}
        callback={handleSubmit}
      >
        <Form.Item
          name="reason"
          label="Lost reason:"
          required
        >
          <Input.TextArea maxLength={150} showCount rows={3} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description:"
          initialValue={''}
        >
          <Input.TextArea maxLength={100} showCount rows={2} />
        </Form.Item>
      </CreateModal>
    </>
  )
}
