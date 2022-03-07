import { ISchedule } from '@modules/schedule/entity/schedule.entity';
import { Badge } from 'antd';
import { Moment } from 'moment';

interface DateRendererProps {
  value: Moment;
  data: ISchedule[];
}

const getListData = (data: ISchedule[], value: Moment) => {
  const unsorted = data.filter((item) => {
    const date = new Date(item.dueDate);
    if (
      date.getDate() === value.date() &&
      date.getMonth() === value.month() &&
      date.getFullYear() === value.year()
    )
      return true;
  });
  return unsorted.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
};

export const DateRenderer: React.FC<DateRendererProps> = ({ value, data }) => {
  const listData = getListData(data, value);
  return (
    <ul className='events'>
      {listData.map((item) => (
        <li key={item.id}>
          <Badge status={'processing'} text={item.summary} />
        </li>
      ))}
    </ul>
  );
};
