import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from 'react';
import { Field } from 'formik';

import { ErrorMessage, InputContainer, CheckboxWrapper } from './styles';
import { theme } from '../../../styles/theme';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelColor?: string;
  errorColor?: string;
  error?: string | null | any;
  disable?: boolean;
}

const FormikCheckboxBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  {
    label,
    labelColor = theme.color.gray5,
    errorColor = theme.color.danger,
    name,
    error,
    disable = false,
    ...rest
  },
  ref,
) => (
  <InputContainer $error={!!error}>
    <CheckboxWrapper $disable={disable} $labelColor={labelColor}>
      <Field type="checkbox" id={name} name={name} ref={ref} {...rest} disabled={disable} />
      <label htmlFor={name}>{label}</label>
    </CheckboxWrapper>
    <ErrorMessage $errorColor={errorColor}>{!!error && <p className="p3">{error}</p>}</ErrorMessage>
  </InputContainer>
);
export const FormikCheckbox = forwardRef(FormikCheckboxBase);
