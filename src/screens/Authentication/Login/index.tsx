import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';

import { Button } from '../../../components/Buttons/Button';
import { FormikInput } from '../../../components/Form/FormikInput';

import * as yup from 'yup';
import * as Style from './styles';

import { theme } from '../../../styles/theme';
import { icons } from '../../../assets/icons';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Api } from '../../../services/api';
import { IFormData, ILoginData } from './type';

export const Login = () => {
  const navigate = useNavigate();
  const [onQuery, setOnQuery] = useState<boolean>(false);

  const schema = yup.object({
    email: yup.string().email('E-mail inválido!').required('Digite seu e-mail'),
    password: yup.string().required('Digite sua senha'),
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  async function requestUserLogin(formData: IFormData) {
    setOnQuery(true);
    await Api.get('/login')
      .then(({ data }: { data: ILoginData[] }) => {
        const loginAccount = data.find((login) => login.email === formData.email);

        if (loginAccount && loginAccount.password === formData.password) {
          navigate('/home');
          localStorage.setItem('authToken', loginAccount.id);
        } else {
          toast.error('E-mail ou senha incorreto!');
        }

        setOnQuery(false);
      })
      .catch(() => {
        toast.success('Algo deu errado!');
        setOnQuery(false);
      });
  }

  return (
    <>
      <Style.Background>
        <Formik
          validationSchema={schema}
          initialValues={{ email: '', password: '' }}
          onSubmit={async (data: IFormData) => {
            requestUserLogin(data);
          }}
        >
          {({ errors, values, touched }) => (
            <>
              <Style.LoginContainer>
                <Form>
                  <Style.InputWrapper>
                    <Link to="/home">
                      <img src={icons.aperaLogo} alt="" />
                    </Link>
                    <FormikInput
                      name="email"
                      label="E-mail"
                      placeholder="Ex: joao.silva@satc.com"
                      value={values.email}
                      error={touched.email && errors.email ? errors.email : null}
                    />

                    <FormikInput
                      name="password"
                      label="Senha"
                      type="password"
                      value={values.password}
                      placeholder="Insira sua senha"
                      error={touched.password && errors.password ? errors.password : null}
                    />
                  </Style.InputWrapper>
                  <Button
                    fullWidth
                    center
                    label="Login"
                    loading={onQuery}
                    type="submit"
                    color={theme.color.primary}
                    bgColor={theme.color.success}
                  />
                </Form>
                <Style.RegisterContainer>
                  <Style.RegisterContent>
                    <hr />
                    <p className="p3">Não possui cadastro?</p>
                    <hr />
                  </Style.RegisterContent>
                  <Button
                    fullWidth
                    center
                    label="Criar uma conta"
                    disable={onQuery}
                    type="submit"
                    color={theme.color.primary}
                    bgColor={theme.color.success}
                    outlined
                    onClick={() => navigate('/signup')}
                  />
                </Style.RegisterContainer>
              </Style.LoginContainer>
            </>
          )}
        </Formik>
      </Style.Background>
    </>
  );
};
