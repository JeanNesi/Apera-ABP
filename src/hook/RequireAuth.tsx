import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem('authToken')) navigate('/login');
    else
      setUser({
        id: 'a169a2ca-d569-4542-92b9-02b95ab65c8e',
        name: 'Lucas',
        profilePicture:
          'https://api.dicebear.com/6.x/initials/svg?seed=Lucas Ferreira&backgroundColor=4FE24C&textColor=2A2A32',
      });
  }, []);

  return children;
};
