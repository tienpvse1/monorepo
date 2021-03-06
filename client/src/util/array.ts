import { ITeam } from '@modules/team/entity/team.entity';
import { SchemaOf } from 'yup';

export const removeDuplicate = <T>(array: T[], field: keyof T) => {
  const items = array?.filter(
    (value, index, self) =>
      index === self?.findIndex((t) => t[field] === value[field])
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

export const sortTeams = (data: ITeam[]) => {
  data.forEach((team) => {
    if (team.accounts) {
      team.accounts.sort((a, b) => a.teamIndex - b.teamIndex);
    }
  });
  data.sort((a, b) => a.index - b.index);
};
export const reIndexTeam = (data: ITeam[]) => {
  const reIndexed = data.map((column, index) => {
    column.accounts = column.accounts.map((account, index) => ({
      ...account,
      teamIndex: index,
    }));
    return {
      ...column,
      index,
    };
  });
  return reIndexed;
};

export const abstractReIndex = <Parent>(
  array: Parent[],
  childField: keyof Parent,
  childIndex = 'index'
) => {
  const reIndexed = array.map((column, index) => {
    // @ts-ignore
    column[childField] = column[childField].map((item, index) => ({
      ...item,
      [childIndex]: index,
    }));
    return {
      ...column,
      index,
    };
  });
  return reIndexed;
};
export const abstractSort = <Parent>(
  array: Parent[],
  childField: keyof Parent,
  childIndex = 'index'
) => {
  array.forEach((item) => {
    if (item[childField]) {
      // @ts-ignore
      item[childField].sort((a, b) => a[childIndex] - b[childIndex]);
    }
  });
  // @ts-ignore
  array.sort((a, b) => a.index - b.index);
};
