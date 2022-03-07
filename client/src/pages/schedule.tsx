import { Loading } from '@components/loading/loading';
import { DateRenderer } from '@components/schedule/date-renderer';
import { ScheduleDrawer } from '@components/schedule/drawer';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useBooleanToggle } from '@mantine/hooks';
import { ISchedule } from '@modules/schedule/entity/schedule.entity';
import { useSchedulesByMonth } from '@modules/schedule/query/schedule.get';
import { Calendar } from 'antd';
import { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import '../stylesheets/schedule.css';
interface ScheduleProps {}

const Schedule: React.FC<ScheduleProps> = ({}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [drawerData, setDrawerData] = useState<ISchedule[]>([]);
  const [value, toggle] = useBooleanToggle(false);
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data, refetch, isLoading } = useSchedulesByMonth(id, currentMonth);
  useEffect(() => {
    refetch();
  }, [currentMonth]);

  const onSelect = (date: Moment) => {
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
    <>
      {!isLoading ? (
        <>
          <Calendar
            onPanelChange={(e) => setCurrentMonth(e.month())}
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
    </>
  );
};

export default Schedule;
