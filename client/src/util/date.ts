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
