export interface Permission {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  action: string;
  subject: string;
  permissionGroup: string;
}
