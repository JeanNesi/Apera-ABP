// LIBS
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Field } from 'formik';

// TYPES
import { IInput } from './utils/types';

// COMPONENTS
import { ErrorMessage, InputContainer, CheckboxWrapper } from './styles';
import { theme } from '../../../styles/theme';

const FormikRadioBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
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
) => {
  const randomId = String(Math.random());
  return (
    <InputContainer error={!!error}>
      <CheckboxWrapper disable={disable} labelColor={labelColor}>
        <Field
          type="radio"
          id={name + randomId}
          name={name}
          ref={ref}
          {...rest}
          disabled={disable}
        />
        <label htmlFor={name + randomId}>{label}</label>
      </CheckboxWrapper>
      <ErrorMessage errorColor={errorColor}>
        {!!error && <p className="p8">{error}</p>}
      </ErrorMessage>
    </InputContainer>
  );
};
export const FormikRadio = forwardRef(FormikRadioBase);
