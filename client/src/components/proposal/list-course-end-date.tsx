import { PUBLIC_USER_INFO } from "@constance/cookie";
import { dateFormat } from "@constance/date-format";
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { useQueryPipelineByAccountId } from "@modules/pipeline-items/query/pipeline-item.get";
import { FormInstance, List } from "antd"
import moment from "moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { MyListItem } from "./my-list-item";
const { DEFAULT } = dateFormat;


interface ListCourseEndDateProps {
  mountProposal?: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance;
}

export const ListCourseEndDate: React.FC<ListCourseEndDateProps> = ({ mountProposal, form }) => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data } = useQueryPipelineByAccountId(id);

  const handleFilterMoment = (
    array: IPipelineItem[],
    beforeTime = moment(),
    afterTime = moment().add(1, 'months')
  ) => {
    return array?.filter((value) =>
      moment(value.opportunityRevenue.course.endDate, DEFAULT)
        .isBetween(moment(beforeTime, DEFAULT), moment(afterTime, DEFAULT), undefined, '[]'))
  }

  const dataFilter = data?.filter((value) => value.pipelineColumn.isWon);
  const dataFinal = handleFilterMoment(dataFilter);

  useEffect(() => {
    console.log('123');
    
    form.setFieldsValue({
      name: dataFinal?.[0].name,
      contactId: dataFinal?.[0].contact.id,
      companyName: dataFinal?.[0].contact.company.id
    })
  }, [data])

  const [tabId, setTabId] = useState<any>(0);

  const isActive = (id: number) => {
    return tabId === id;
  }
  const onActiveTab = (id: number) => {
    setTabId(id);
    if (id !== tabId)
      mountProposal(true);
  }

  return (
    <>
      <List
        size="small"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
          size: 'small'
        }}
        itemLayout="horizontal"
        header={<span style={{ fontSize: '16px' }}>List Course End Date</span>}
        dataSource={dataFinal}
        renderItem={(item, index: number) => (
          <MyListItem
            item={item}
            index={index}
            onActiveTab={onActiveTab}
            isActive={isActive}
            form={form}
          />
        )}
      />
    </>
  )
}
