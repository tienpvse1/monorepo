import { TableOutlined } from '@ant-design/icons';
import { Loading } from '@components/loading/loading';
import { DateRenderer } from '@components/schedule/date-renderer';
import { ScheduleDrawer } from '@components/schedule/drawer';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useBooleanToggle } from '@mantine/hooks';
import { ISchedule } from '@modules/schedule/entity/schedule.entity';
import { useSchedulesByMonth } from '@modules/schedule/query/schedule.get';
import { Button, Calendar, Tooltip } from 'antd';
import { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../../stylesheets/schedule.css';
interface ScheduleProps { }

const MyCalendar: React.FC<ScheduleProps> = ({ }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [drawerData, setDrawerData] = useState<ISchedule[]>([]);
  const [value, toggle] = useBooleanToggle(false);
  const navigate = useNavigate();
  const [
    {
      public_user_info: { id, role },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data, refetch, isLoading } = useSchedulesByMonth(id, currentMonth);
  useEffect(() => {
    refetch();
  }, [currentMonth]);

  const onSelect = (date: Moment) => {
    console.log('then this');
    const items = data.filter((item) => {
      const currentDate = new Date(item.dueDate);
      return (
        currentDate.getDate() === date.date() &&
        currentDate.getMonth() === date.month() &&
        currentDate.getFullYear() === date.year()
      );
    });
    toggle(true);

    setDrawerData(
      items.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
    );
  };

  return (
    <div className="container-page">
      {role.name === 'sale' ? '' :
        <Tooltip title='List all'>
          <Button
            onClick={() => navigate('list-all')}
            icon={<TableOutlined />}
            style={{ float: 'right', marginTop: '12px', marginLeft: '10px' }}
          />
        </Tooltip>}
      {!isLoading ? (
        <>
          <Calendar
            onPanelChange={(e) => {
              console.log('this get called');
              setCurrentMonth(e.month());
            }}
            onSelect={(e) => onSelect(e)}
            dateCellRender={(moment) => (
              <DateRenderer data={data} value={moment} />
            )}
          />
          <ScheduleDrawer data={drawerData} toggle={toggle} isVisible={value} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MyCalendar;