import { envVars } from "@env/var.env"
import Column from 'antd/lib/table/Column'
import { Table } from "antd"
import { ISchedule } from "@modules/schedule/entity/schedule.entity";
import { Link } from "react-router-dom";
import moment from "moment";
import { dateFormat } from "@constance/date-format";
import { CoffeeOutlined, FileTextOutlined, MailOutlined, PhoneOutlined, PushpinOutlined } from "@ant-design/icons";
import { useHandleNavigate } from "@hooks/useHandleNavigate";
const { DEFAULT, DUE_DATE } = dateFormat;

interface ListSchedulesProps {
  schedule: ISchedule[];
}

export const ListSchedules: React.FC<ListSchedulesProps> = ({
  schedule
}) => {

  const { navigateRole } = useHandleNavigate();

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
        width={100}
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
        title="Created Date"
        dataIndex="createdAt"
        key="createdAt"
        render={(_, record: ISchedule) => (
          <Link className="my-link" to={`${navigateRole}schedule`} >
            {moment(record.createdAt).format(DEFAULT)}
          </Link>
        )}
        sorter={(a, b) =>
          moment(a.createdAt).diff(moment(b.createdAt))
        }
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
    </Table>
  )
}
