/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties } from 'styled-components';

export interface ITableHeader {
  colsHeader: {
    label: string;
    cssProps?: CSSProperties;
    cssOnMedia?: CSSProperties;
  }[];
  children: ReactElement[] | ReactElement;
}

export interface ITableBody {
  colsBody: {
    cell: any;
    cssProps?: CSSProperties;
    cssOnMedia?: CSSProperties;
  }[];

  onClick?: () => void;
}
