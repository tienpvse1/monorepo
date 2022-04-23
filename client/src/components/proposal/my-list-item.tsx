import { envVars } from "@env/var.env"
import { Avatar, FormInstance, List, Modal, Tag } from "antd"
import { useHover } from '@mantine/hooks';
import { FileSearchOutlined } from "@ant-design/icons";
import { ThemeColor } from "@constance/color";
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import moment from "moment";
import { dateFormat } from "@constance/date-format";
const { DEFAULT } = dateFormat;
import { Typography } from 'antd';
import { useToggle } from "@hooks/useToggle";
import { ListCourse } from "@components/opportunity/list-course";
const { Text } = Typography;

interface MyListItemProps {
  item: IPipelineItem;
  onActiveTab: (id: number) => void;
  isActive: (id: number) => boolean;
  index: number;
  form: FormInstance;
}

const getItemStyle = () => ({
  border: `2px solid ${ThemeColor.primaryColor}`,
  borderRadius: '5px'
})

export const MyListItem: React.FC<MyListItemProps> = ({
  item,
  onActiveTab,
  isActive,
  index,
  form
}) => {

  const { hovered, ref } = useHover();
  const [isModalVisible, toggleModal] = useToggle();

  const onClickListItem = () => {
    onActiveTab(index);
    form.resetFields();
    form.setFieldsValue({
      name: item.name,
      contactId: item.contact.id,
      companyName: item.contact.company.id
    });
  }

  return (
    <>
      <div
        className="my-list-item"
        ref={ref}
        onClick={onClickListItem}
      >
        <List.Item style={isActive(index) ? getItemStyle() : {}}>
          <List.Item.Meta
            avatar={<Avatar src={`${envVars.VITE_BE_DOMAIN}/files/box.png`} />}
            title={
              <>
                <a onClick={toggleModal}>
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
              <>
                <span>
                  <Text type="warning">Opportunity:</Text> {item.name}
                </span> <br />
                <span>
                  <Text type="danger">Contact:</Text> {item.contact.name} - {item.contact.email}
                </span>
                {hovered &&
                  <span style={{ float: 'right' }} >
                    <FileSearchOutlined onClick={() => toggleModal()} style={{ fontSize: '18px' }} />
                  </span>
                }
              </>
            }
          />
        </List.Item>
      </div>
      <Modal
        title="Course Detail"
        style={{ top: 20 }}
        width={600}
        bodyStyle={{ height: '450px' }}
        visible={isModalVisible}
        onOk={toggleModal}
        onCancel={toggleModal}
      >
        <ListCourse
          course={item.opportunityRevenue.course}
          quantity={item.opportunityRevenue.quantity}
        />
      </Modal>
    </>
  )
}
