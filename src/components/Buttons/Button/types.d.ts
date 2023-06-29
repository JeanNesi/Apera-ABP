import { ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: string;
  spinnerColor?: string;
  bgColor?: string;
  disable?: boolean;
  outlined?: boolean;
  loading?: boolean;
  center?: boolean;
  borderless?: boolean;
  fullWidth?: boolean;
}
