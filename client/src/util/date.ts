export const getHistoryDate = (historyDate: Date) => {
  const date = new Date(historyDate);
  const hour =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  return `${hour}:${minute}`;
};
