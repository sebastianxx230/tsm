import { createContext, useContext, useState, type ReactNode } from 'react';
import { users, type User, type RoleId, type ModuleId, type Action, can } from '../data/mockData';

interface PermissionsContextValue {
  currentUser: User;
  setCurrentUserId: (id: string) => void;
  can: (module: ModuleId, action: Action) => boolean;
  roleLabel: string;
  roleColor: string;
}

const PermissionsContext = createContext<PermissionsContextValue | null>(null);

export function PermissionsProvider({ children }: { children: ReactNode }) {
  const [currentUserId, setCurrentUserId] = useState(users[0].id);
  const currentUser = users.find((u) => u.id === currentUserId) ?? users[0];

  const value: PermissionsContextValue = {
    currentUser,
    setCurrentUserId,
    can: (module: ModuleId, action: Action) => can(currentUser.role as RoleId, module, action),
    roleLabel: currentUser.role,
    roleColor: '',
  };

  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>;
}

export function usePermissions() {
  const ctx = useContext(PermissionsContext);
  if (!ctx) throw new Error('usePermissions must be used within PermissionsProvider');
  return ctx;
}
