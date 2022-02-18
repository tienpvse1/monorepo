import { SchemaOf } from 'yup';

export const removeDuplicate = <T>(array: T[], field: keyof T) => {
  const items = array.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t[field] === value[field])
  );

  return items;
};

export const removeMissingProps = async <T>(
  array: T[],
  schema: SchemaOf<T>
) => {
  const result: T[] = [];
  for (const item of array) {
    const isValid = await schema.isValid(item);
    if (isValid) {
      result.push(item);
    }
  }
  return result;
};
