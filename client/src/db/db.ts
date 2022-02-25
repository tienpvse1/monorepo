import Dexie, { Table } from 'dexie';

// defined permission modal interface
export interface IPermission {
  id: string;
  action: string;
  subject: string;
}

export interface DbPipeline {
  name: string;
  id: string;
}
class Db extends Dexie {
  permission!: Table<IPermission>;
  pipeline!: Table<DbPipeline>;
  constructor() {
    super('db');
    this.version(1).stores({
      // define permission table modal
      permission: '++id,action,subject',
      pipeline: '++id,name',
    });
  }
}

export const db = new Db();
