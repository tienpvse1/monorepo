import { ITeam } from '@modules/team/entity/team.entity';
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
