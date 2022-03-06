import { Loading } from '@components/loading/loading';
import { DateRenderer } from '@components/schedule/date-renderer';
import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useSchedulesByMonth } from '@modules/schedule/query/schedule.get';
import { Calendar } from 'antd';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import '../stylesheets/schedule.css';
interface ScheduleProps {}

const Schedule: React.FC<ScheduleProps> = ({}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data, refetch, isLoading } = useSchedulesByMonth(id, currentMonth);
  useEffect(() => {
    refetch();
  }, [currentMonth]);

  return (
    <>
      {!isLoading ? (
        <Calendar
          onPanelChange={(e) => setCurrentMonth(e.month())}
          dateCellRender={(moment) => (
            <DateRenderer data={data} value={moment} />
          )}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Schedule;
