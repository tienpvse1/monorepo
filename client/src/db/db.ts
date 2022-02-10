import Dexie, { Table } from 'dexie';

// defined permission modal interface
export interface IPermission {
  id: string;
  action: string;
  subject: string;
}

class Db extends Dexie {
  permission!: Table<IPermission>;

  constructor() {
    super('db');
    this.version(1).stores({
      // define permission table modal
      permission: '++id,action,subject',
    });
  }
}

export const db = new Db();
