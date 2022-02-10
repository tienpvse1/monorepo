import { ability } from '@context/permission.context';
import { Permission } from '@modules/permission/entity/permission.entity';
import { nanoid } from 'nanoid';
import { db } from './db';

export const savePermissions = async (permission: Permission[]) => {
  // first transform the permission so that casl can read an understand rules we provided
  const transformedPermission = permission.map((item) => ({
    action: item.action,
    subject: item.subject,
  }));
  // give the user some ability after successfully login
  ability.update(transformedPermission);

  // in order to save the permission to db, each permission must have an unique key
  const transformedPermissionWithId = transformedPermission.map((item) =>
    Object.assign(item, { id: nanoid(5) })
  );

  console.log(transformedPermissionWithId);

  const savedPermissions = await db.permission.bulkAdd(
    transformedPermissionWithId
  );
  return savedPermissions;
};

export const loadAllPermissions = async () => {
  const permissions = await db.permission.toArray();
  return permissions;
};

export const clearOutPermissions = async () => {
  await db.permission.clear();
};
