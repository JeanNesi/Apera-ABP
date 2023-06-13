/* eslint-disable no-console */

import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';

import { Button } from '../../components/Buttons/Button';
import { FormikInput } from '../../components/Form/FormikInput';

import * as Style from './styles';

import { theme } from '../../styles/theme';
import { icons } from '../../assets/icons';
import { schema } from './utils/functions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

export const Settings = () => {
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Style.Background>
      <Formik
        validationSchema={schema}
        initialValues={{ name: 'Lucas Ferreira', email: 'lucas@gmail.com', password: '123' }}
        onSubmit={async (data) => {
          setOnQuery(true);
          setTimeout(() => {
            if (data.email === 'lucas@gmail.com' && data.password === '123') {
              localStorage.setItem('authToken', uuid());
              navigate('/dashboard/TAEE11');
            } else {
              setOnQuery(false);
              toast.error('E-mail ou senha inválidos!');
            }
          }, 1500);
        }}
      >
        {({ errors, values, touched }) => (
          <>
            <Style.LoginContainer>
              <Form>
                <Style.InputWrapper>
                  <img src={icons.aperaLogo} alt="" />
                  <FormikInput
                    name="name"
                    label="E-mail"
                    placeholder="Ex: João Silva"
                    value={values.name}
                    error={touched.name && errors.name ? errors.name : null}
                  />
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
                  loading={onQuery}
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
  );
};
