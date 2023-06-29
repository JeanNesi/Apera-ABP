/* eslint-disable no-console */

import { useState } from 'react';
import { Formik, Form } from 'formik';

import { Button } from '../../../components/Buttons/Button';
import { FormikInput } from '../../../components/Form/FormikInput';

import * as yup from 'yup';
import * as Style from './styles';

import { theme } from '../../../styles/theme';
import { icons } from '../../../assets/icons';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Api } from '../../../services/api';
import { IFormData } from './types';

export const SignUp = () => {
  const navigate = useNavigate();
  const [onQuery, setOnQuery] = useState<boolean>(false);

  const schema = yup.object({
    name: yup.string().required('Campo obrigatório!'),
    email: yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
    password: yup
      .string()
      .required('Campo obrigatório!')
      .min(8, 'Sua senha deve ter no minimo 8 caracteres'),
    confirmPassword: yup
      .string()
      .required('Campo obrigatório!')
      .oneOf([yup.ref('password')], 'Senhas não conferem!'),
  });

  async function createUserAccount(data: IFormData) {
    setOnQuery(true);
    await Api.post('/login', {
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then(() => {
        toast.success('Cadastro realizado com sucesso!');
        navigate('/login');
        setOnQuery(false);
      })
      .catch(() => {
        toast.success('Algo deu errado!');
        setOnQuery(false);
      });
  }

  return (
    <Style.Background>
      <Formik
        validationSchema={schema}
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validateOnChange={true}
        onSubmit={async (data: IFormData) => {
          createUserAccount(data);
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
                    label="Nome"
                    labelColor="#fff"
                    placeholder="Ex: João Silva"
                    value={values.name}
                    error={touched.name && errors.name ? errors.name : null}
                  />
                  <FormikInput
                    name="email"
                    label="E-mail"
                    labelColor="#fff"
                    placeholder="Ex: joao.silva@satc.com"
                    value={values.email}
                    error={touched.email && errors.email ? errors.email : null}
                  />

                  <FormikInput
                    name="password"
                    label="Senha"
                    labelColor="#fff"
                    type="password"
                    value={values.password}
                    placeholder="Insira sua senha"
                    error={touched.password && errors.password ? errors.password : null}
                  />
                  <FormikInput
                    name="confirmPassword"
                    label="Confirme sua senha"
                    labelColor="#fff"
                    type="password"
                    value={values.confirmPassword}
                    placeholder="Confirme sua senha"
                    error={
                      touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : null
                    }
                  />
                </Style.InputWrapper>
                <Button
                  fullWidth
                  center
                  label="Cadastrar"
                  loading={onQuery}
                  type="submit"
                  color={theme.color.primary}
                  bgColor={theme.color.success}
                />
                <Button
                  fullWidth
                  center
                  label="Voltar"
                  disable={onQuery}
                  type="submit"
                  color={theme.color.primary}
                  bgColor={theme.color.success}
                  outlined
                  spinnerColor={theme.color.success}
                  onClick={() => navigate('/login')}
                />
              </Form>
            </Style.LoginContainer>
          </>
        )}
      </Formik>
    </Style.Background>
  );
};
