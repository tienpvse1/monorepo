export const checkDuplicate = <Field>(value: Field[], prop: keyof Field) => {
  const valueArr = value.map((item) => {
    return item[prop];
  });
  const isDuplicate = valueArr.some((item, idx) => {
    return valueArr.indexOf(item) != idx;
  });

  return isDuplicate;
};

export const randomlySelect = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
