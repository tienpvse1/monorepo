import {
  ClockCircleOutlined,
  FlagOutlined,
  MailOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { CreateModal } from '@components/modal/create-modal';
import { CreateScheduleForm } from '@components/schedule/create-schedule-form';
import { useBooleanToggle } from '@mantine/hooks';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { useDeletePipelineItems } from '@modules/pipeline-items/mutation/pipeline-items.delete';
import { Avatar, Button, Card, Divider, Dropdown, Space, Tag } from 'antd';
import { lazy, Suspense } from 'react';
import { PopoverAction } from '../../popover/popover-action';
import { ICreateScheduleDto } from '@modules/schedule/dto/create-schedule.dto';
import { useCreateSchedule } from '@modules/schedule/mutation/schedule.post';
import { client } from '../../../App';
import { GET_PIPELINE_DESIGN } from '@modules/pipeline/query/pipeline.get';
import { useNavigate } from 'react-router-dom';
const Planned = lazy(() => import('@components/schedule/planned'));
const { Meta } = Card;

interface PipelineCardItemProps {
  cardData: IPipelineItem;
}

export const PipelineCardItem: React.FC<PipelineCardItemProps> = ({ cardData }) => {
  const [isDropdownVisible, toggleDropdown] = useBooleanToggle(false);
  const [value, toggle] = useBooleanToggle(false);
  const { mutate } = useCreateSchedule();
  const { mutate: removePipelineItems } = useDeletePipelineItems();
  const onDeletePipeLineItem = () => removePipelineItems(cardData.id);
  const navigate = useNavigate();

  console.log(cardData.schedules);
  
  const handleViewDetailClick = () => {
    navigate(`/opportunities/view-details/${cardData.id}`)
  };

  const handleSubmit = (value: any) => {
    const schedule: ICreateScheduleDto = {
      ...value,
      pipelineItemId: cardData.id,
    };
    mutate(schedule, {
      onSuccess: () => client.refetchQueries(GET_PIPELINE_DESIGN),
    });
  };

  return (
    <>
      <Card
        extra={
          <PopoverAction
            option1='View details'
            option2='Delete'
            handleOption2={onDeletePipeLineItem}
            handleOption1={handleViewDetailClick}
          >
            <Button
              icon={<MoreOutlined />}
              style={{ border: 'none', boxShadow: 'none' }}
            />
          </PopoverAction>
        }
        title={
          <>
            <span style={{ fontWeight: 500 }}>
              <FlagOutlined style={{ color: 'green' }} />
              {` ${cardData.name}`}
            </span>
            <Tag color={'blue'} style={{ marginLeft: 10, borderRadius: 5 }}>
              Design
            </Tag>
          </>
        }
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 5,
          boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Meta
          description={
            <>
              <div style={{ fontSize: 16 }}>UX - User Flow</div>
              <Divider
                style={{ marginBottom: 6, borderTop: '1px solid #D4D4D8' }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Space size={'middle'}>
                  <MailOutlined style={{ fontSize: 18 }} />

                  <Dropdown
                    visible={isDropdownVisible}
                    destroyPopupOnHide
                    overlay={
                      <Suspense fallback={<></>}>
                        <Planned
                          toggleModal={toggle}
                          cardData={cardData}
                          toggleDropdown={toggleDropdown}
                          isDropdownVisible={isDropdownVisible}
                        />
                      </Suspense>
                    }
                  >
                    <ClockCircleOutlined
                      onClick={() => toggleDropdown()}
                      style={{ fontSize: 18, cursor: 'pointer', color: cardData.schedules.length > 0 ? 'green' : '' }}
                    />
                  </Dropdown>

                  <Tag style={{ marginLeft: 10, borderRadius: 5 }}>
                    Modified 2h ago
                  </Tag>
                </Space>
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              </div>
            </>
          }
        />
      </Card>
      <CreateModal
        width={500}
        title='Schedule Activity 2'
        isOpenModal={value}
        toggleCreateModal={() => toggle()}
        callback={(record) => handleSubmit(record)}
      >
        <CreateScheduleForm />
      </CreateModal>
    </>
  );
};
