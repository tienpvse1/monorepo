import { ClockCircleOutlined, FlagOutlined, MessageOutlined, MoreOutlined } from "@ant-design/icons";
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { useDeletePipelineItems } from "@modules/pipeline-items/mutation/pipeline-items.delete";
import { Avatar, Button, Card, Divider, Tag } from "antd"
import { PopoverAction } from "../../popover/popover-action";
import { DrawerDetails } from "../../drawer";
import { useToggle } from "@hooks/useToggle";
import { OpportunityDetails } from "../opportunity/opportunity-details";
const { Meta } = Card;

interface PipelineCardItemProps {
  dataCardPipeline: IPipelineItem;
}

export const PipelineCardItem: React.FC<PipelineCardItemProps> = ({ dataCardPipeline }) => {
  const [showDrawer, setShowDrawer] = useToggle();
  const { removePipelineItems } = useDeletePipelineItems();
  const onDeletePipeLineItem = () => removePipelineItems(dataCardPipeline.id);
  const onViewDetailsPipeLineItem = () => setShowDrawer();

  return (
    <>
      <Card
        extra={
          <PopoverAction
            itemName1="View details"
            itemName2="Delete"
            callbackMethodDelete={onDeletePipeLineItem}
            callbackMethodUpdate={onViewDetailsPipeLineItem}
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
              {` ${dataCardPipeline.name}`}
            </span>
            <Tag color={'blue'} style={{ marginLeft: 10, borderRadius: 5 }}>Design</Tag>
          </>
        }
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 5,
          boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Meta
          description={
            <>
              <div style={{ fontSize: 16 }}>
                UX - User Flow
              </div>
              <Divider style={{ marginBottom: 6, borderTop: '1px solid #D4D4D8' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span><MessageOutlined style={{ fontSize: 18 }} /> 2 </span>
                  <span><ClockCircleOutlined style={{ fontSize: 18 }} /> 2h </span>
                  <span>
                    <Tag style={{ marginLeft: 10, borderRadius: 5 }}>2h</Tag>
                  </span>

                </div>
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              </div>
            </>
          }
        />
      </Card>
      <DrawerDetails
        visible={showDrawer}
        onClose={setShowDrawer}
        title="Opportunity"
        placement="right"
        width={'850px'}
      >
        <OpportunityDetails dataCardPipeline={dataCardPipeline} />
      </DrawerDetails>
    </>
  )
}
