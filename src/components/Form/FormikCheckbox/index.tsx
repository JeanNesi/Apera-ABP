// LIBS
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Field } from 'formik';

// TYPES
import { IInput } from './utils/types';

// COMPONENTS
import { ErrorMessage, InputContainer, CheckboxWrapper } from './styles';
import { theme } from '../../../styles/theme';

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
  <InputContainer error={!!error}>
    <CheckboxWrapper disable={disable} labelColor={labelColor}>
      <Field type="checkbox" id={name} name={name} ref={ref} {...rest} disabled={disable} />
      <label htmlFor={name}>{label}</label>
    </CheckboxWrapper>
    <ErrorMessage errorColor={errorColor}>{!!error && <p className="p3">{error}</p>}</ErrorMessage>
  </InputContainer>
);
export const FormikCheckbox = forwardRef(FormikCheckboxBase);
