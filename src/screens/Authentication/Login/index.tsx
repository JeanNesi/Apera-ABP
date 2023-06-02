/* eslint-disable no-console */
// LIBS
import { useState } from 'react';
import { Formik, Form } from 'formik';

// COMPONENTS
import { Button } from '../../../components/Buttons/Button';
import { FormikInput } from '../../../components/Form/FormikInput';

// STYLES
import * as Style from './styles';

import { theme } from '../../../styles/theme';
import { icons } from '../../../assets/icons';
import { schema } from './utils/functions';

export const Login = () => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  return (
    <Style.Background>
      <Formik
        validationSchema={schema}
        initialValues={{ email: '', password: '' }}
        onSubmit={async () => {
          setOnQuery(true);
        }}
      >
        {({ errors, values, touched }) => (
          <>
            <Style.LoginContainer>
              <Form>
                <Style.InputWrapper>
                  <img src={icons.aperaLogo} alt="" />
                  <FormikInput
                    name="email"
                    label="E-mail"
                    placeholder="Ex: joao.silva@ada.com.br"
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
            </Style.LoginContainer>
          </>
        )}
      </Formik>
    </Style.Background>
  );
};
