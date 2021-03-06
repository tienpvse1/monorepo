import { dateFormat } from '@constance/date-format';
import { ISchedule } from '@modules/schedule/entity/schedule.entity';
import moment, { Moment } from 'moment';
const { DEFAULT } = dateFormat;

export const getHistoryDate = (historyDate: Date) => {
  const date = new Date(historyDate);
  const hour =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  return `${hour}:${minute}`;
};
export const convert = (str: string) => {
  var date = new Date(str),
    month = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), month, day].join('-');
};

export const convert2 = (str: string) => {
  const date = new Date(str);
  const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  return [date.getFullYear(), mnth, day, hours, minutes].join('-');
};

export const getMonthToShow = (): Moment[] => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  return [
    moment(new Date(currentYear, currentMonth, 0)).subtract(4, 'M').endOf('M'),
    moment(new Date(currentYear, currentMonth, 0)).subtract(3, 'M').endOf('M'),
    moment(new Date(currentYear, currentMonth, 0)).subtract(2, 'M').endOf('M'),
    moment(new Date(currentYear, currentMonth, 0)).subtract(1, 'M').endOf('M'),
    moment(new Date(currentYear, currentMonth, 0)).endOf('M'),
    moment(new Date(currentYear, currentMonth, 0)).add(1, 'M').endOf('M'),
  ];
};

export const isIn = (date: string, month: Moment) => {
  return moment(date).add(1, 'M').isBetween(month, month.clone().add(1, 'M'));
};

export const warningExpectedClosing = (
  expectedClosing: moment.MomentInput,
  beforeTime = moment(),
  afterTime = moment().add(7, 'days')
) => moment(expectedClosing, DEFAULT)
  .isBetween(moment(beforeTime, DEFAULT), moment(afterTime, DEFAULT), undefined, '[)')

export const convertNumToDate = (number: number) => {
  if (number == 1) return 'January';
  if (number == 2) return 'February';
  if (number == 3) return 'March';
  if (number == 4) return 'April';
  if (number == 5) return 'May';
  if (number == 6) return 'June';
  if (number == 7) return 'July';
  if (number == 8) return 'August';
  if (number == 9) return 'September';
  if (number == 10) return 'October';
  if (number == 11) return 'November';
  if (number == 12) return 'December';
};

export const handleColorSchedule = (schedules: ISchedule[]) => {
  const newSchedule = schedules.filter((value) => value.isDone === false);

  if (newSchedule.length > 0
    && newSchedule.some((value) => value.isDone === false)
    && !newSchedule.some((value) => (new Date(value.dueDate).getTime() <= new Date().getTime()))) {

    return '#FFB300';

  } else if (newSchedule.length > 0 && newSchedule.some((value) => value.isDone === false)) {

    return 'red';

  } else {
    return '';
  }
}