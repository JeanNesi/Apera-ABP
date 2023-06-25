import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { IUser } from './types';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
