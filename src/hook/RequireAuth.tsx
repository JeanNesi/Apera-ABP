import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) navigate('/login');
  }, []);

  return children;
};
