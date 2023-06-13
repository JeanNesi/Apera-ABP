import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().required('Campo obrigatório!'),
  email: yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
  password: yup.string().required('Campo obrigatório!'),
  confirmPassword: yup
    .string()
    .required('Campo obrigatório!')
    .oneOf([yup.ref('password')], 'Senhas não conferem!'),
});
