import { envVars } from '@env/var.env';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Badge, Button, Descriptions, Form, Input, message, PageHeader, Tag } from 'antd';
import moment from 'moment';
import { CreateModal } from '@components/modal/create-modal';
import { useToggle } from '@hooks/useToggle';
import { useQueryClient } from 'react-query';
import { GET_PIPELINE_ITEM_BY_ID } from '@modules/pipeline-items/query/pipeline-item.get';
import { useCreateReason } from '@modules/reason/mutation/reason.post';
import { useLoseOpportunity } from '@modules/pipeline-items/mutation/pipeline-item.patch';
import numberSeparator from "number-separator";

interface OpportunityTitleDetailsProps {
  opportunity?: IPipelineItem;
}

export const OpportunityTitleDetails: React.FC<
  OpportunityTitleDetailsProps
> = ({ opportunity }) => {
  const [isVisible, toggleModal] = useToggle();
  const { mutate: createReason } = useCreateReason();
  const { mutate: loseOpportunity } = useLoseOpportunity();
  const queryClient = useQueryClient();
  const handleSubmit = (record: any) => {
    loseOpportunity({ id: opportunity.id }, {
      onSuccess: () => {
        createReason({
          ...record,
          pipelineItemId: opportunity.id,
          reasonType: 'lose',
          invoiceId: '',
          photo: ''
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries([GET_PIPELINE_ITEM_BY_ID, opportunity.id]);
            message.success('Lost opportunity success!')
          }
        })
      }
    })
  }
  return (
    <>
      <Badge.Ribbon
        text={opportunity.isLose ? 'Lost' : 'Won'}
        color={opportunity.isLose ? '#757575' : 'green'}
        style={{
          marginRight: '20px',
          marginTop: '8px',
          display: opportunity.pipelineColumn.isWon || opportunity.isLose ? 'flex' : 'none',
          alignItems: 'center',
          height: '26px',
          fontSize: '20px',
        }}
      >
        <div className='container-title-details'>
          <PageHeader
            className='site-page-header'
            onBack={() => window.history.back()}
            extra={
              <>
                {!opportunity.pipelineColumn.isWon && !opportunity.isLose && (
                  <Button
                    className='button-ant-custom-style'
                    type='primary'
                    size='middle'
                    onClick={toggleModal}
                  >
                    Lost
                  </Button>
                )}
                {/* <Button
                  className='button-ant-custom-style'
                  type='primary'
                  size='middle'
                >
                  Discount
                </Button> */}
              </>
            }
            title={
              <>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <img
                    src={`${envVars.VITE_BE_DOMAIN}/files/crown.png`}
                    width={47}
                    height={47}
                  />
                  <span>
                    {opportunity.name} <br />
                    {opportunity.isLose ?
                      <Tag color={'purple'}>Lost Opportunity</Tag> :
                      <Tag color={'cyan'}>Opportunity</Tag>}
                  </span>
                </span>
              </>
            }
          >
            <Descriptions size='small' column={3}>
              <Descriptions.Item label='Serve by'>
                {opportunity.account?.firstName} {opportunity.account?.lastName}
              </Descriptions.Item>

              <Descriptions.Item label='Created at'>
                {moment(new Date(opportunity.createdAt)).fromNow()}
              </Descriptions.Item>
              <Descriptions.Item label='Expected revenue'>
                {numberSeparator(opportunity.expectedRevenue, '.')}đ
                {opportunity.discountCode &&
                  <Tag
                    color={'red'}
                    style={{ marginLeft: '5px' }}
                  >
                    -{`${opportunity.discountCode.discountAmount * 100}`}%
                  </Tag>
                }
              </Descriptions.Item>
              <Descriptions.Item label='Expected closing'>
                {opportunity.expectedClosing ?
                  moment(new Date(opportunity.expectedClosing)).fromNow() : ''}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
      </Badge.Ribbon>
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
  );
};
