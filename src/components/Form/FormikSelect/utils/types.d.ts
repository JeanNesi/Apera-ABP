/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<SelectHTMLAttributes> {
  label: string;
  error?: string | null | any;
  selectPlaceholderValue?: string;
}
