import { PUBLIC_USER_INFO } from '@constance/cookie';
import { useAllMySchedules } from '@modules/schedule/query/schedule.get';
import { useCookies } from 'react-cookie';
import { PieChart } from './pie-chart';

interface TaskNoteProps {}

export const TaskNote: React.FC<TaskNoteProps> = ({}) => {
  const [
    {
      public_user_info: { id: accountId },
    },
  ] = useCookies([PUBLIC_USER_INFO]);

  const { data: schedules } = useAllMySchedules(accountId);
  return (
    <>
      {schedules && (
        <div>
          <PieChart schedules={schedules} />
        </div>
      )}
    </>
  );
};
