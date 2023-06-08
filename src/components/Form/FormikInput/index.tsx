import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from 'react';
import { Field } from 'formik';

import { ErrorMessage, InputContainer } from './styles';
import { theme } from '../../../styles/theme';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelColor?: string;
  errorColor?: string;
  error?: string | null | any;
  passwordPlaceholder?: boolean;
}

const FormikInputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  {
    label,
    labelColor = theme.color.gray5,
    errorColor = theme.color.danger,
    name,
    error,
    passwordPlaceholder,
    ...rest
  },
  ref,
) => (
  <InputContainer
    $error={error !== null ? true : undefined}
    $passwordPlaceholder={passwordPlaceholder}
    $labelcolor={labelColor}
  >
    {label && <p className="p5">{label}</p>}
    <Field id={name} name={name} ref={ref} {...rest} />
    <ErrorMessage $errorcolor={errorColor}>{!!error && <p className="p9">{error}</p>}</ErrorMessage>
  </InputContainer>
);
export const FormikInput = forwardRef(FormikInputBase);
