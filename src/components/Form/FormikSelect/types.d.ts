import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null | any;
  selectPlaceholderValue?: string;
}
