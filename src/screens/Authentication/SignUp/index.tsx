/* eslint-disable no-console */

import { useState } from 'react';
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
import { IFormData, ITab } from './types';
import { applyMask } from '../../../utils/functions';
import { FormikSelect } from '../../../components/Form/FormikSelect';

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

export const SignUp = () => {
  const navigate = useNavigate();
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<ITab>({
    label: 'Pessoa',
    value: 'person',
  });

  const tabOptions: ITab[] = [
    { label: 'Pessoa', value: 'person' },
    { label: 'Empresa', value: 'company' },
  ];

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
        initialValues={{
          name: '',
          email: '',
          birthDate: '',
          cnpj: '',
          corporateReason: '',
          fantasy_name: '',
          gender: '',
          cpf: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        }}
        validateOnChange={true}
        onSubmit={async (data: IFormData) => {
          createUserAccount(data);
        }}
      >
        {({ errors, values, touched, setFieldValue }) => (
          <>
            <Style.LoginContainer>
              <Form>
                <Style.InputWrapper>
                  <Link to="/home">
                    <img src={icons.aperaLogo} alt="" />
                  </Link>

                  <Style.TabsContainer>
                    <Style.TabsHeader>
                      {tabOptions.map((category) => (
                        <Style.Tab
                          key={category.value}
                          $activeTab={selectedTab.value}
                          $tab={category}
                          onClick={() => {
                            setSelectedTab(category);
                          }}
                        >
                          <h6>{category.label}</h6>
                        </Style.Tab>
                      ))}
                    </Style.TabsHeader>
                  </Style.TabsContainer>

                  {selectedTab.value === 'company' && (
                    <>
                      <FormikInput
                        name="fantasy_name"
                        label="Nome fantasia"
                        labelColor="#fff"
                        placeholder="Ex: Apera"
                        value={values.fantasy_name}
                        error={
                          touched.fantasy_name && errors.fantasy_name ? errors.fantasy_name : null
                        }
                      />

                      <FormikInput
                        name="cnpj"
                        label="CNPJ"
                        labelColor="#fff"
                        placeholder="Ex: 00.000.000/0000-00"
                        value={values.cnpj}
                        error={touched.cnpj && errors.cnpj ? errors.cnpj : null}
                        maxLength={18}
                        onChange={(evt) =>
                          setFieldValue(
                            'cnpj',
                            applyMask({ mask: 'CNPJ', value: evt.target.value }).value,
                          )
                        }
                      />

                      <FormikInput
                        name="corporateReason"
                        label="Razão social"
                        labelColor="#fff"
                        placeholder="Ex: Apera Finanças LTDA"
                        value={values.corporateReason}
                        error={
                          touched.corporateReason && errors.corporateReason
                            ? errors.corporateReason
                            : null
                        }
                      />
                    </>
                  )}

                  {selectedTab.value === 'person' && (
                    <>
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
                    </>
                  )}

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
