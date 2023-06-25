import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Api } from '../services/api';
import { toast } from 'react-toastify';
import { DotLoading } from '../components/DotLoading';
import { IUser } from './types';
import { LoadingContainer } from './styles';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  async function validateToken() {
    await Api.get(`/login/${localStorage.getItem('authToken')}`)
      .then(({ data }: { data: IUser }) => {
        setLoading(false);
        setUser({
          id: data.id,
          name: data.name,
          profilePicture: `https://api.dicebear.com/6.x/initials/svg?seed=${data.name}&backgroundColor=4FE24C&textColor=ffffff`,
        });
      })
      .catch((err) => {
        console.log(err);
        navigate('/login');
        toast.error('Token inválido ou expirado!');
      });
  }

  useEffect(() => {
    if (!localStorage.getItem('authToken')) return navigate('/login');

    validateToken();
  }, []);

  return loading ? (
    <LoadingContainer>
      <DotLoading />
    </LoadingContainer>
  ) : (
    children
  );
};
