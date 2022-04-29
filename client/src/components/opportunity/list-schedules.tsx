import { envVars } from "@env/var.env"
import Column from 'antd/lib/table/Column'
import { Button, Table } from "antd"
import { ISchedule } from "@modules/schedule/entity/schedule.entity";
import { Link } from "react-router-dom";
import moment from "moment";
import { dateFormat } from "@constance/date-format";
import { CheckCircleFilled, CheckOutlined, CoffeeOutlined, FileTextOutlined, MailOutlined, PhoneOutlined, PushpinOutlined } from "@ant-design/icons";
import { useHandleNavigate } from "@hooks/useHandleNavigate";
import { useRemoveSchedule } from "@modules/schedule/mutation/schedule.delete";
import { useQueryClient } from "react-query";
import { GET_PIPELINE_ITEM_BY_ID } from "@modules/pipeline-items/query/pipeline-item.get";
const { DUE_DATE } = dateFormat;

interface ListSchedulesProps {
  schedule: ISchedule[];
  opportunityId: string;
}

export const ListSchedules: React.FC<ListSchedulesProps> = ({
  schedule,
  opportunityId
}) => {

  const { navigateRole } = useHandleNavigate();
  const { mutate: removeSchedule } = useRemoveSchedule();
  const queryClient = useQueryClient();

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
    <Table
      dataSource={schedule}
      tableLayout='fixed'
      title={() => <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`${envVars.VITE_BE_DOMAIN}/files/schedule.png`}
            width={40}
            height={40}
          />
          <span
            style={{
              fontSize: '20px',
              color: 'rgba(0,0,0,0.7)',
              fontWeight: '700',
              marginLeft: '10px'
            }}
          >
            Schedule {`(${schedule.length})`}
          </span>
        </div>
      </>}
      pagination={{ position: ['bottomCenter'], style: { fontSize: 15 } }}
      size={'small'}
      rowKey={(record) => record.id}
    >
      <Column
        title="No."
        width={50}
        render={(_, __, index) => (++index)}
      />
      <Column
        title="Activity"
        dataIndex="name"
        width={110}
        key="name"
        render={(_, record: ISchedule) => (
          <Link className="my-link" to={`${navigateRole}schedule`}>
            {handleActivity(record.type)}
          </Link>
        )}
        sorter={(a, b) => ('' + a.summary).localeCompare(b.summary)}
      />

      <Column
        title='Summary'
        dataIndex='summary'
        key='summary'
        render={(_, record: ISchedule) => (
          <Link
            className="my-link"
            to={`${navigateRole}schedule`}
          >
            {record.summary}
          </Link>
        )}
      />

      <Column
        title="Due Date"
        dataIndex="dueDate"
        key="dueDate"
        render={(_, record: ISchedule) => (
          <Link className="my-link" to={`${navigateRole}schedule`}>
            {moment(record.dueDate).format(DUE_DATE)}
          </Link>
        )}
        sorter={(a, b) =>
          moment(a.dueDate).diff(moment(b.dueDate))
        }
      />

      <Column
        title="Action"
        dataIndex="action"
        key="action"
        align="center"
        width={70}
        render={(_, record: ISchedule) => (
          !record.isDone ?
            <Button
              size="small"
              shape="round"
              onClick={() => removeSchedule({ id: record.id, isDone: true }, {
                onSuccess: () => {
                  queryClient.refetchQueries([GET_PIPELINE_ITEM_BY_ID, opportunityId]);
                }
              })}
            >
              <CheckOutlined />
            </Button> :
            <CheckCircleFilled style={{ color: 'rgb(82 196 26)', fontSize: '22px' }} />
        )}
      />

    </Table>
  )
}
