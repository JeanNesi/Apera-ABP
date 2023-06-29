import { useState, useContext } from 'react';
import { Formik, Form } from 'formik';

import { Button } from '../../components/Buttons/Button';
import { FormikInput } from '../../components/Form/FormikInput';

import * as Style from './styles';

import { theme } from '../../styles/theme';
import { AuthContext } from '../../context/AuthContext';

import * as yup from 'yup';
import { Api } from '../../services/api';
import { toast } from 'react-toastify';
import { IFormData } from './types';
import { ModalDeleteAccount } from './utils/ModalDeleteAccount';

export const Settings = () => {
  const { user, setUser } = useContext(AuthContext);

  const [edit, setEdit] = useState<boolean>(false);
  const [onQuery, setOnQuery] = useState<boolean>(false);

  const [modalDeleteAccountIsOpen, setModalDeleteAccountIsOpen] = useState<boolean>(false);

  const schema = yup.object({
    email: yup.string().email('E-mail inválido!'),
    password: yup.string().required('Campo obrigatório!'),
    confirmPassword: yup
      .string()
      .required('Campo obrigatório!')
      .oneOf([yup.ref('password')], 'Senhas não conferem!'),
  });

  async function editUserInfos(data: IFormData) {
    setOnQuery(true);
    await Api.put(`/login/${user?.id}`, {
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then(() => {
        setOnQuery(false);
        setEdit(false);
        toast.success('Informações alteradas com sucesso!');
        setUser({
          id: user?.id ?? '',
          name: data.name,
          email: data.email,
          profilePicture: `https://api.dicebear.com/6.x/initials/svg?seed=${data.name}&backgroundColor=4FE24C&textColor=ffffff`,
        });
      })
      .catch(() => {
        setOnQuery(false);
        toast.error('Algo de errado aconteceu!');
      });
  }

  return (
    <>
      {modalDeleteAccountIsOpen && <ModalDeleteAccount setModal={setModalDeleteAccountIsOpen} />}

      <Style.Background>
        <Formik
          validationSchema={schema}
          initialValues={{
            name: user?.name ?? '',
            email: user?.email ?? '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={async (data: IFormData) => {
            editUserInfos(data);
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
                      disabled={!edit}
                      value={values.name}
                      error={touched.name && errors.name ? errors.name : null}
                    />
                    <FormikInput
                      name="email"
                      label="E-mail"
                      disabled={!edit}
                      placeholder="Ex: joao.silva@satc.com"
                      value={values.email}
                      error={touched.email && errors.email ? errors.email : null}
                    />

                    {edit && (
                      <>
                        <FormikInput
                          name="password"
                          label="Senha"
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
                      </>
                    )}
                  </Style.InputWrapper>

                  <Style.ButtonsContainer>
                    {edit && (
                      <Button
                        fullWidth
                        center
                        label="Salvar"
                        loading={onQuery}
                        type="submit"
                        color={theme.color.primary}
                        bgColor={theme.color.success}
                      />
                    )}

                    <Button
                      fullWidth
                      center
                      label={edit ? 'Cancelar' : 'Alterar dados'}
                      disable={onQuery}
                      type="button"
                      color={theme.color.primary}
                      bgColor={theme.color.success}
                      outlined
                      onClick={() => setEdit(!edit)}
                    />

                    <Button
                      fullWidth
                      center
                      borderless
                      label="Excluir conta"
                      disable={onQuery}
                      type="button"
                      outlined
                      onClick={() => setModalDeleteAccountIsOpen(true)}
                    />
                  </Style.ButtonsContainer>
                </Form>
              </Style.LoginContainer>
            </>
          )}
        </Formik>
      </Style.Background>
    </>
  );
};
