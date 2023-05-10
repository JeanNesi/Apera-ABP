import { ButtonHTMLAttributes } from 'react';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  bgColor?: string;
  disable?: boolean;
  outlined?: boolean;
  loading?: boolean;
  align?: 'flex-end' | 'flex-start' | 'center';
  borderless?: boolean;
  color?: string;
}
