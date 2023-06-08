import { forwardRef, ForwardRefRenderFunction, SelectHTMLAttributes } from 'react';
import { Field } from 'formik';
import { ErrorMessage, SelectContainer } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null | any;
  selectPlaceholderValue?: string;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { label, name, error, selectPlaceholderValue, ...rest },
  ref,
) => (
  <SelectContainer $error={!!error} $selectPlaceholderValue={selectPlaceholderValue}>
    <p className="p5">{label}</p>
    <Field as="select" id={name} name={name} ref={ref} {...rest} />
    <ErrorMessage>{!!error && <p className="p9">{error}</p>}</ErrorMessage>
  </SelectContainer>
);
export const FormikSelect = forwardRef(SelectBase);
