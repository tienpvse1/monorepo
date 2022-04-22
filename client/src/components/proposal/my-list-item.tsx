import { envVars } from "@env/var.env"
import { Avatar, List, Tag } from "antd"
import { useHover } from '@mantine/hooks';
import { FileSearchOutlined } from "@ant-design/icons";
import { ThemeColor } from "@constance/color";
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import moment from "moment";
import { dateFormat } from "@constance/date-format";
const { DEFAULT } = dateFormat;
import { Typography } from 'antd';
const { Text } = Typography;

interface MyListItemProps {
  item: IPipelineItem;
  onActiveTab: (id: number) => void;
  isActive: (id: number) => boolean;
  index: number;
}

const getItemStyle = () => ({
  border: `2px solid ${ThemeColor.primaryColor}`,
  borderRadius: '5px'
})

export const MyListItem: React.FC<MyListItemProps> = ({
  item,
  onActiveTab,
  isActive,
  index
}) => {
  const { hovered, ref } = useHover();
  return (
    <div
      className="my-list-item"
      ref={ref}
      onClick={() => onActiveTab(index)}
    >
      <List.Item style={isActive(index) ? getItemStyle() : {}}>
        <List.Item.Meta
          avatar={<Avatar src={`${envVars.VITE_BE_DOMAIN}/files/box.png`} />}
          title={
            <>
              <a href="">
                {item.opportunityRevenue.course.name}
              </a> <br />
              <Tag color='volcano'>
                ID: {item.opportunityRevenue.course.id}
              </Tag> <br />
              <Tag color={'purple'}>
                End Date: {moment(item.opportunityRevenue.course.endDate).format(DEFAULT)}
              </Tag>
            </>
          }
          description={
            <div>
              <span>
                <Text type="warning">Opportunity:</Text> {item.name}
              </span> <br />
              <span>
                <Text type="danger">Contact:</Text> {item.contact.name} - {item.contact.email}
              </span>
              {hovered &&
                <span style={{ float: 'right' }} >
                  <FileSearchOutlined style={{ fontSize: '18px' }} />
                </span>
              }
            </div>
          }
        />
      </List.Item>
    </div>
  )
}
