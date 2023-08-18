import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | null | number | string;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Account {
  id: Generated<string>;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
  username: string;
  firstName: string | null;
  lastName: string | null;
  active: Generated<boolean | null>;
  image: string | null;
  email: string;
  password: string;
  isLeader: Generated<boolean | null>;
  teamIndex: number | null;
  teamId: string | null;
  role: string | null;
}

export interface AccountPipeline {
  accountId: string;
  pipelineId: string;
}

export interface AccountPipelineItem {
  accountId: string;
  pipelineItemId: string;
}

export interface BaseTable {
  id: Generated<string>;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
}

export interface Contact {
  id: Generated<string>;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
  name: string;
  birth: Timestamp | null;
  phone: string | null;
  email: string | null;
  image: Json | null;
  address: string | null;
  jobPosition: string | null;
  internalNotes: string | null;
  deletedAt: Timestamp | null;
  createdById: string | null;
}

export interface GeographyColumns {
  fTableCatalog: string | null;
  fTableSchema: string | null;
  fTableName: string | null;
  fGeographyColumn: string | null;
  coordDimension: number | null;
  srid: number | null;
  type: string | null;
}

export interface GeometryColumns {
  fTableCatalog: string | null;
  fTableSchema: string | null;
  fTableName: string | null;
  fGeometryColumn: string | null;
  coordDimension: number | null;
  srid: number | null;
  type: string | null;
}

export interface Permission {
  id: Generated<string>;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
  deletedAt: Timestamp | null;
  resource: string;
  action: string;
}

export interface PermissionRole {
  permissionId: string;
  role: string;
}

export interface Pipeline {
  id: Generated<string>;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
  name: string;
  teamId: string | null;
  accountId: string | null;
  description: string | null;
  deletedAt: Timestamp | null;
}

export interface PipelineColumn {
  id: Generated<string>;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
  name: string;
  isWon: Generated<boolean | null>;
  pipelineId: string | null;
  deletedAt: Timestamp | null;
  index: number | null;
}

export interface PipelineItem {
  id: Generated<string>;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
  name: string;
  index: Generated<number | null>;
  priority: Generated<number | null>;
  expectedClosing: Timestamp | null;
  expectedRevenue: Generated<number | null>;
  description: Generated<string | null>;
  lost: Generated<boolean | null>;
  contactId: string | null;
  pipelineColumnId: string | null;
  deletedAt: Timestamp | null;
  createdById: string | null;
}

export interface Product {
  id: Generated<string>;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
  name: string;
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  price: Generated<number | null>;
  deletedAt: Timestamp | null;
}

export interface ProductAccount {
  productId: string;
  accountId: string;
  deletedAt: Timestamp | null;
}

export interface Role {
  name: string;
  deletedAt: Timestamp | null;
}

export interface SchemaMigrations {
  version: string;
}

export interface SpatialRefSys {
  srid: number;
  authName: string | null;
  authSrid: number | null;
  srtext: string | null;
  proj4text: string | null;
}

export interface Tag {
  id: Generated<string>;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
  deletedAt: Timestamp | null;
  label: string;
  styles: Generated<Json | null>;
}

export interface TagProduct {
  productId: string;
  tagId: string;
}

export interface Team {
  id: Generated<string>;
  createdAt: Generated<Timestamp | null>;
  updatedAt: Timestamp | null;
  name: string;
  createdById: string;
  leaderId: string;
  deletedAt: Timestamp | null;
}

export interface DB {
  account: Account;
  accountPipeline: AccountPipeline;
  accountPipelineItem: AccountPipelineItem;
  baseTable: BaseTable;
  contact: Contact;
  geographyColumns: GeographyColumns;
  geometryColumns: GeometryColumns;
  permission: Permission;
  permissionRole: PermissionRole;
  pipeline: Pipeline;
  pipelineColumn: PipelineColumn;
  pipelineItem: PipelineItem;
  product: Product;
  productAccount: ProductAccount;
  role: Role;
  schemaMigrations: SchemaMigrations;
  spatialRefSys: SpatialRefSys;
  tag: Tag;
  tagProduct: TagProduct;
  team: Team;
}
