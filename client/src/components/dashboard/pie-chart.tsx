import { ISchedule } from '@modules/schedule/entity/schedule.entity';
import { Alert, Badge, Collapse } from 'antd';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import moment from 'moment';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const { Panel } = Collapse;
interface PieChartProps {
  schedules: ISchedule[];
}

const filterOutOverdue = (schedules: ISchedule[]) => {
  return schedules.filter(
    (item) => new Date(item.dueDate).getTime() < new Date().getTime()
  );
};

const filterOutOngoing = (schedules: ISchedule[]) => {
  return schedules.filter(
    (item) => new Date(item.dueDate) >= moment(new Date()).add(7, 'd').toDate()
  );
};

const filterOutNearly = (schedules: ISchedule[]) => {
  return schedules.filter(
    (item) =>
      !(new Date(item.dueDate) >= moment(new Date()).add(7, 'd').toDate()) &&
      !(new Date(item.dueDate).getTime() < new Date().getTime())
  );
};

export const PieChart: React.FC<PieChartProps> = ({ schedules }) => {
  const data = {
    labels: ['overdue', 'On-going', 'nearly'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          filterOutOverdue(schedules).length,
          filterOutOngoing(schedules).length,
          filterOutNearly(schedules).length,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        display: 'flex',
        marginLeft: 100,
        gap: 70
      }}
    >
      <div
        style={{
          width: 400,
          height: 400,
        }}
      >
        <Pie
          data={data}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 60,
        }}
      >
        <Collapse defaultActiveKey={['1']} ghost>
          <Panel
            header={
              <Badge count={filterOutOngoing(schedules).length} size='small'>
                <span style={{ paddingRight: 10 }}>On-going</span>
              </Badge>
            }
            key='1'
          >
            {filterOutOngoing(schedules).map((item) => (
              <Alert
                showIcon
                message={item.summary}
                type='success'
                description={
                  <>
                    <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>
                      {moment(item.dueDate).fromNow()}
                    </div>
                    <div>{item.note}</div>
                  </>
                }
              />
            ))}
          </Panel>
          <Panel
            header={
              <Badge count={filterOutNearly(schedules).length} size='small'>
                <span style={{ paddingRight: 10 }}>Nearly</span>
              </Badge>
            }
            key='2'
          >
            {filterOutNearly(schedules).map((item) => (
              <Alert
                showIcon
                message={item.summary}
                type='warning'
                description={
                  <>
                    <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>
                      {moment(item.dueDate).fromNow()}
                    </div>
                    <div>{item.note}</div>
                  </>
                }
              />
            ))}
          </Panel>
          <Panel
            header={
              <Badge count={filterOutOverdue(schedules).length} size='small'>
                <span style={{ paddingRight: 10 }}>Overdue</span>
              </Badge>
            }
            key='3'
          >
            {filterOutOverdue(schedules).map((item) => (
              <Alert
                showIcon
                message={item.summary}
                type='error'
                description={
                  <>
                    <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>
                      {moment(item.dueDate).fromNow()}
                    </div>
                    <div>{item.note}</div>
                  </>
                }
              />
            ))}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
