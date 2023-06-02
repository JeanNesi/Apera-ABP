import { ButtonHTMLAttributes } from 'react';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: string;
  bgColor?: string;
  disable?: boolean;
  outlined?: boolean;
  loading?: boolean;
  center?: boolean;
  borderless?: boolean;
  fullWidth?: boolean;
}
