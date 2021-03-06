import { AnyMongoAbility, defineAbility } from '@casl/ability';
import { createContextualCan } from '@casl/react';
import { loadAllPermissions } from '@db/permission.db';
import { createContext, FC, useEffect } from 'react';

// initial empty permission
export const ability = defineAbility((can) => can([]));

// this function will handle loading permission from database
const getInitialPermission = async () => {
  const permissionsFromDB = await loadAllPermissions();

  const permissions = permissionsFromDB.map((permission) => ({
    action: permission.action,
    subject: permission.subject,
  }));
  ability.update(permissions);
};

export const AbilityContext = createContext<AnyMongoAbility>(null!);

// create an jsx(tsx) tag that will handle authorization stuffs
export const Can = createContextualCan(AbilityContext.Consumer);

export const AbilityProvider: FC = ({ children }) => {
  // every time app start again, load add the permission come from database if exist
  useEffect(() => {
    getInitialPermission();
  }, []);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};
