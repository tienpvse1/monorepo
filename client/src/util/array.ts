export const removeDuplicate = <T>(array: T[], field: keyof T) => {
  const items = array.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t[field] === value[field])
  );
  console.log(array);

  return items;
};
