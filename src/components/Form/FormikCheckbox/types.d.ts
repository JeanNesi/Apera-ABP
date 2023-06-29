import { InputHTMLAttributes } from 'react';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelColor?: string;
  errorColor?: string;
  error?: string | null | any;
  disable?: boolean;
}
