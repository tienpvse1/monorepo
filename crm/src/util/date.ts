export const convertDate = (date: string): Date => {
  const dateParts = date.split('-');

  // month is 0-based, that's why we need dataParts[1] - 1
  return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
};
export const convertDateFromDb = (date: string): Date => {
  const dateParts = date.split('-');

  // month is 0-based, that's why we need dataParts[1] - 1
  return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
};

export const checkDateValid = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => endDate >= startDate;

export const normalizeDate = (date: string | Date) => {
  return date.toString().replace('-', '');
};
