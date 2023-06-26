/* eslint-disable no-console */

import { useEffect, useState, useContext } from 'react';
import { Formik, Form } from 'formik';

import { Button } from '../../components/Buttons/Button';
import { FormikInput } from '../../components/Form/FormikInput';

import * as Style from './styles';

import { theme } from '../../styles/theme';
import { schema } from './utils/functions';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Settings = () => {
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(true);
  // const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Style.Background>
      <Formik
        validationSchema={schema}
        initialValues={{ name: 'Lucas Ferreira', email: 'lucas@gmail.com', password: '123' }}
        onSubmit={async () => {
          setOnQuery(true);
        }}
      >
        {({ errors, values, touched }) => (
          <>
            <Style.LoginContainer>
              <Form>
                <Style.ImageContainer>
                  <Style.UserImage src={user?.profilePicture} alt="" />
                </Style.ImageContainer>
                <Style.InputWrapper>
                  <FormikInput
                    name="name"
                    label="Nome"
                    placeholder="Ex: João Silva"
                    disabled={edit}
                    value={values.name}
                    error={touched.name && errors.name ? errors.name : null}
                  />
                  <FormikInput
                    name="email"
                    label="E-mail"
                    disabled={edit}
                    placeholder="Ex: joao.silva@satc.com"
                    value={values.email}
                    error={touched.email && errors.email ? errors.email : null}
                  />

                  <FormikInput
                    name="password"
                    label="Senha"
                    type="password"
                    disabled={edit}
                    value={values.password}
                    placeholder="Insira sua senha"
                    error={touched.password && errors.password ? errors.password : null}
                  />
                </Style.InputWrapper>
                <Button
                  fullWidth
                  center
                  label="Salvar"
                  loading={onQuery}
                  type="submit"
                  color={theme.color.primary}
                  bgColor={theme.color.success}
                />
              </Form>
              <Style.RegisterContainer>
                <Style.RegisterContent>
                  <hr />
                  <p className="p3">ou</p>
                  <hr />
                </Style.RegisterContent>
                <Button
                  fullWidth
                  center
                  label="Alterar dados"
                  loading={onQuery}
                  type="submit"
                  color={theme.color.primary}
                  bgColor={theme.color.success}
                  outlined
                  onClick={() => setEdit(!edit)}
                />
              </Style.RegisterContainer>
            </Style.LoginContainer>
          </>
        )}
      </Formik>
    </Style.Background>
  );
};
