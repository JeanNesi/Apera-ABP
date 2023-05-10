/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextareaHTMLAttributes } from 'react';

export interface TextAreaProps extends TextareaHTMLAttributes<TextareaHTMLAttributes> {
  label?: string;
  height?: string;
  error?: string | null | any;
}
