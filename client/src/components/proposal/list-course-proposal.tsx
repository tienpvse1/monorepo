import { envVars } from "@env/var.env";
import { useHover } from "@mantine/hooks";
import { QUERY_RANDOM_COURSE, useRandomCourse } from "@modules/product/query/products.get";
import { Avatar, List, Tag } from "antd";
import { useEffect, useState } from "react";
import { FileSearchOutlined } from "@ant-design/icons";
import moment from "moment";
import numberSeparator from "number-separator";
import { dateFormat } from "@constance/date-format";
import { useQueryClient } from "react-query";
const { DEFAULT } = dateFormat;
import { Typography } from 'antd';
import { nanoid } from "nanoid";
import { ThemeColor } from "@constance/color";
const { Text } = Typography;

interface ListCourseProposalProps {
  flag: boolean;
}

export const ListCourseProposal: React.FC<ListCourseProposalProps> = ({ flag = false }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useRandomCourse();
  const { hovered, ref } = useHover();
  const [tabId, setTabId] = useState<any>(1);

  const isActive = (id: number) => {
    return tabId === id;
  }
  const onActiveTab = (id: number) => {
    setTabId(id);
  }
  const getItemStyle = () => ({
    border: `2px solid ${ThemeColor.primaryColor}`,
    borderRadius: '5px'
  })

  useEffect(() => {
    queryClient.refetchQueries(QUERY_RANDOM_COURSE);
  }, [flag])

  return (
    <List
      rowKey={() => nanoid(5)}
      loading={isLoading}
      itemLayout="horizontal"
      header={<span>List Course Proposal</span>}
      dataSource={[data]}
      size='small'
      renderItem={(item, index) => (
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
                    {item?.name}
                  </a> <br />
                  <Tag color='volcano'>
                    ID: {item?.id}
                  </Tag> <br />
                  <Tag color={'green'}>
                    Start Date: {moment().add(1, 'months').format(DEFAULT)}
                  </Tag> <br />
                  <span>
                    <Text type="warning">Unit Price:</Text> {numberSeparator(item ? item.price : 0, '.')}đ
                  </span> <br />
                  <span>
                    <Text type="danger">Number Of Trainee:</Text> {item?.number_of_trainee || 10}
                  </span>
                </>
              }
              description={
                <div>
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
      )}
    />
  )
}
