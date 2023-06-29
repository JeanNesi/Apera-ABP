import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Field } from 'formik';

import { ErrorMessage, InputContainer } from './styles';
import { theme } from '../../../styles/theme';
import { IInput } from './types';

const FormikInputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  {
    label,
    labelColor = theme.color.gray1,
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
    {label && <p className="p6">{label}</p>}
    <Field id={name} name={name} ref={ref} {...rest} />
    <ErrorMessage $errorcolor={errorColor}>{!!error && <p className="p9">{error}</p>}</ErrorMessage>
  </InputContainer>
);
export const FormikInput = forwardRef(FormikInputBase);
