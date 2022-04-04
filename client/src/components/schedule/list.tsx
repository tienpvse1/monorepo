import { useQueryAllSchedule } from "@modules/schedule/query/schedule.get";
import { Table } from "antd";
import { TableTitle } from "./table-title";
import Column from 'antd/lib/table/Column'
import { ISchedule } from "@modules/schedule/entity/schedule.entity";
import { CoffeeOutlined, FileTextOutlined, MailOutlined, PhoneOutlined, PushpinOutlined } from "@ant-design/icons";
import moment from "moment";
import { dateFormat } from "@constance/date-format";
import { useCookies } from "react-cookie";
import { PUBLIC_USER_INFO } from "@constance/cookie";
import { removeDuplicate } from "@util/array";
import { useMemo } from "react";
const { DUE_DATE } = dateFormat;

const ListSchedule = () => {
  const { data, isLoading } = useQueryAllSchedule();

  //filter created by follow account id
  const [{ public_user_info }] = useCookies([PUBLIC_USER_INFO]);

  const handleFilter = () => {
    const accountFilter = data?.filter((value) => value.account?.id !== public_user_info.id)
    const accountFormat = accountFilter?.map((value) => ({
      text: `${value.account?.firstName} ${value.account?.lastName}`,
      value: `${value.account?.firstName} ${value.account?.lastName}`
    }))
    const account = removeDuplicate(accountFormat, 'value');
    account?.unshift({
      text: 'My schedule',
      value: `${public_user_info.firstName} ${public_user_info.lastName}`
    })
    return account;
  }
  const arrayFilter = useMemo(() => handleFilter(), [data])

  const handleActivity = (scheduleType: string) => {
    let node = <><PushpinOutlined /> Document</>;
    switch (scheduleType) {
      case 'todo':
        node = <><FileTextOutlined /> Todo</>
        break;
      case 'email':
        node = <><MailOutlined /> Email</>
        break;
      case 'meeting':
        node = <><CoffeeOutlined /> Meeting</>
        break;
      case 'call':
        node = <><PhoneOutlined /> Call</>
        break;
    }
    return node;
  }

  return (
    <div className="container-page">
      <Table
        loading={isLoading}
        dataSource={data}
        title={() => <TableTitle />}
        pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
        size={'small'}
        rowKey={(record) => record.id}
      >
        <Column
          title="Opportunity"
          dataIndex="pipelineItem"
          key="pipelineItem"
          render={(_, record: ISchedule) => (
            <span>
              {record.pipelineItem.name}
            </span>
          )}
        sorter={(a, b) => ('' + a.pipelineItem.name).localeCompare(b.pipelineItem.name)}
        />

        <Column
          title="Activity"
          dataIndex="name"
          key="name"
          render={(_, record: ISchedule) => (handleActivity(record.type))}
          sorter={(a, b) => ('' + a.summary).localeCompare(b.summary)}
        />

        <Column
          title='Summary'
          dataIndex='summary'
          key='summary'
          render={(_, record: ISchedule) => (
            <span>{record.summary}</span>
          )}
        />

        <Column
          title="Due Date"
          dataIndex="dueDate"
          key="dueDate"
          render={(_, record: ISchedule) => (
            <span>
              {moment(record.dueDate).format(DUE_DATE)}
            </span>
          )}
          sorter={(a, b) =>
            moment(a.dueDate).diff(moment(b.dueDate))
          }
        />

        <Column
          title="Created By"
          dataIndex="account"
          key="account"
          render={(_, record: ISchedule) => (
            <span>
              {`${record.account.firstName} ${record.account.lastName}`}
            </span>
          )}
          filters={arrayFilter}
          filterSearch={true}
          onFilter={(value, record) => {
            let fullName = `${record.account?.firstName} ${record.account?.lastName}`
            return fullName.indexOf(value as string) === 0
          }}
        />
      </Table>
    </div>
  )
}
export default ListSchedule;