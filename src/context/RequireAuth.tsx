import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Api } from '../services/api';
import { toast } from 'react-toastify';
import { DotLoading } from '../components/DotLoading';
import { IValidateTokenData } from './types';
import { LoadingContainer } from './styles';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  async function validateToken() {
    await Api.post(`/auth/refreshtoken`, {
      refreshToken: localStorage.getItem('refreshToken'),
    })
      .then(({ data }: { data: IValidateTokenData }) => {
        setLoading(false);

        localStorage.setItem('authToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      })
      .catch(() => {
        if (location.pathname === '/home') {
          localStorage.clear();
          setUser(null);
          return setLoading(false);
        }
        navigate('/home');
        toast.error('Token inválido ou expirado!');
      });
  }

  useEffect(() => {
    // if (!localStorage.getItem('authToken') && location.pathname !== '/home')
    //   return navigate('/login');

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
