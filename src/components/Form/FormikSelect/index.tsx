// LIBS
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Field } from 'formik';

// TYPES
import { SelectProps } from './utils/types';

// COMPONENTS
import { ErrorMessage, SelectContainer } from './styles';

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { label, name, error, selectPlaceholderValue, ...rest },
  ref,
) => (
  <SelectContainer error={!!error} selectPlaceholderValue={selectPlaceholderValue}>
    <p className="p5">{label}</p>
    <Field as="select" id={name} name={name} ref={ref} {...rest} />
    <ErrorMessage>{!!error && <p className="p9">{error}</p>}</ErrorMessage>
  </SelectContainer>
);
export const FormikSelect = forwardRef(SelectBase);
