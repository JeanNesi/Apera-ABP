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
import { useNavigate } from 'react-router-dom';
import { applyMask, dateToISOString } from '../../utils/functions';
import { FormikSelect } from '../../components/Form/FormikSelect';
import { IconButton } from '../../components/Buttons/IconButton';
import { icons } from '../../assets/icons';

export const Settings = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

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

  // async function requestUserInfos(data: IFormData) {
  //   setOnQuery(true);
  //   await Api.get('/userRegistration/company')
  //     .then(() => {
  //       toast.success('Cadastro realizado com sucesso!');
  //       navigate('/login');
  //       setOnQuery(false);
  //     })
  //     .catch((error) => {
  //       catchHandler(error);
  //       setOnQuery(false);
  //     });
  // }

  // async function createUserCompany(data: IFormData) {
  //   setOnQuery(true);
  //   await Api.post('/userRegistration/company', {
  //     address: {
  //       cep: null,
  //       city: null,
  //       complement: null,
  //       id: null,
  //       neighborhood: null,
  //       number: null,
  //       street: null,
  //       uf: null,
  //     },
  //     cnpj: unMask(data.cnpj),
  //     corporateReason: data.corporateReason,
  //     fantasyName: data.fantasyName,
  //     phoneNumber: unMask(data.phoneNumber),
  //     user: {
  //       username: data.userName,
  //       email: data.email,
  //       password: data.password,
  //     },
  //   })
  //     .then(() => {
  //       toast.success('Cadastro realizado com sucesso!');
  //       navigate('/login');
  //       setOnQuery(false);
  //     })
  //     .catch((error) => {
  //       catchHandler(error);
  //       setOnQuery(false);
  //     });
  // }

  // async function createUserPerson(data: IFormData) {
  //   setOnQuery(true);
  //   await Api.post('/userRegistration/person', {
  //     address: {
  //       cep: null,
  //       city: null,
  //       complement: null,
  //       id: null,
  //       neighborhood: null,
  //       number: null,
  //       street: null,
  //       uf: null,
  //     },
  //     birthDate: data.birthDate,
  //     cpf: unMask(data.cnpj),
  //     gender: data.gender,
  //     name: data.name,
  //     phoneNumber: unMask(data.phoneNumber),
  //     user: {
  //       username: data.userName,
  //       email: data.email,
  //       password: data.password,
  //     },
  //   })
  //     .then(() => {
  //       toast.success('Cadastro realizado com sucesso!');
  //       navigate('/login');
  //       setOnQuery(false);
  //     })
  //     .catch((error) => {
  //       catchHandler(error);
  //       setOnQuery(false);
  //     });
  // }

  async function editUserInfos(data: IFormData) {
    setOnQuery(true);
    await Api.put(`/login/${user?.id}`, {
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then(() => {
        setOnQuery(false);

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
        <Style.Card>
          <Style.CardLeftSide>
            <Style.ImageContainer>
              <Style.UserImage src={user?.profilePicture} alt="" />
            </Style.ImageContainer>

            <Style.MenuButtonsContainer>
              <Style.SignoutButtonContainer>
                <IconButton
                  className="p6"
                  labelPos="right"
                  icon={icons.user}
                  label="Dados pessoais"
                  color={theme.color.white}
                  onClick={() => ''}
                />
              </Style.SignoutButtonContainer>

              <Style.SignoutButtonContainer>
                <IconButton
                  className="p6"
                  icon={icons.house}
                  labelPos="right"
                  label="Endereço"
                  color={theme.color.white}
                  onClick={() => ''}
                />
              </Style.SignoutButtonContainer>

              <Style.SignoutButtonContainer>
                <IconButton
                  className="p6"
                  icon={icons.password}
                  labelPos="right"
                  label="Alterar Senha"
                  color={theme.color.white}
                  onClick={() => ''}
                />
              </Style.SignoutButtonContainer>
            </Style.MenuButtonsContainer>

            <Style.SignoutButtonContainer>
              <IconButton
                icon={icons.power}
                label="Sair"
                labelPos="right"
                color={theme.color.white}
                onClick={() => navigate('/login')}
              />
            </Style.SignoutButtonContainer>
          </Style.CardLeftSide>

          <Formik
            validationSchema={schema}
            initialValues={{
              name: 'Apera',
              userName: '',
              email: 'apera@gmail.com',
              birthDate: dateToISOString(new Date()),
              cnpj: '00.000.000/0001-22',
              corporateReason: 'Apera LTDA',
              fantasyName: 'Apera',
              gender: '',
              cpf: '123.456.789-10',
              phoneNumber: '(48) 99999-9999',
              password: '',
              confirmPassword: '',
            }}
            validateOnChange={true}
            onSubmit={async (data: IFormData) => {
              editUserInfos(data);
            }}
          >
            {({ errors, values, touched, setFieldValue }) => (
              <>
                <Form>
                  <Style.InputWrapper>
                    <FormikInput
                      name="name"
                      label="Nome"
                      labelColor="#fff"
                      placeholder="Ex: João Silva"
                      value={values.name}
                      error={touched.name && errors.name ? errors.name : null}
                    />

                    <FormikInput
                      name="cpf"
                      label="CPF"
                      labelColor="#fff"
                      placeholder="Ex: 111.222.333-44"
                      value={values.cpf}
                      error={touched.cpf && errors.cpf ? errors.cpf : null}
                      maxLength={14}
                      onChange={(evt) =>
                        setFieldValue(
                          'cpf',
                          applyMask({ mask: 'CPF', value: evt.target.value }).value,
                        )
                      }
                    />

                    <FormikInput
                      name="birthDate"
                      type="date"
                      label="Data de nascimento"
                      labelColor="#fff"
                      value={values.birthDate}
                      error={touched.birthDate && errors.birthDate ? errors.birthDate : null}
                    />

                    <FormikSelect name="gender" label="Sexo">
                      <option value="masc">Masculino</option>
                      <option value="fem">Feminino</option>
                      <option value="nf">Não informado</option>
                    </FormikSelect>

                    <FormikInput
                      name="phoneNumber"
                      label="Telefone"
                      labelColor="#fff"
                      placeholder="Ex: (48) 99999-9999"
                      value={values.phoneNumber}
                      error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : null}
                      maxLength={15}
                      onChange={(evt) =>
                        setFieldValue(
                          'phoneNumber',
                          applyMask({ mask: 'TEL', value: evt.target.value }).value,
                        )
                      }
                    />

                    <FormikInput
                      name="email"
                      label="E-mail"
                      labelColor="#fff"
                      placeholder="Ex: joao.silva@satc.com"
                      value={values.email}
                      error={touched.email && errors.email ? errors.email : null}
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
              </>
            )}
          </Formik>
        </Style.Card>
      </Style.Background>
    </>
  );
};
