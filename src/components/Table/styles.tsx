/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const Background = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 ${theme.size.xxsm};
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableRowHead = styled.tr<{ $bgColor?: string }>`
  height: 32px;
  vertical-align: top;
`;

export const TableRow = styled.tr<{ $bgColor?: string; $hasOnClick: boolean }>`
  ${({ $bgColor }) => $bgColor && `background-color: ${$bgColor};`};

  ${({ $hasOnClick }) =>
    $hasOnClick &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
`;

export const TableColHeader = styled.th<{ $cssProps: any; $cssOnMedia: any }>`
  color: ${theme.color.gray4};
  text-align: center;
  white-space: nowrap;
  /* padding-inline: ${theme.size.sm}; */

  ${({ $cssProps }) => $cssProps}

  @media (max-width:900px) {
    ${({ $cssOnMedia }) => $cssOnMedia}
  }
`;

export const TableColBody = styled.td<{
  textAlign?: string;
  cssProps: any;
  cssOnMedia: any;
}>`
  height: ${theme.size.xxlg};
  text-align: center;
  padding-inline: ${theme.size.sm};
  white-space: nowrap;

  &:first-of-type {
    border-radius: ${theme.size.xxsm} 0px 0px ${theme.size.xxsm};
    padding-left: ${theme.size.sm};
  }

  &:last-of-type {
    border-radius: 0px ${theme.size.xxsm} ${theme.size.xxsm} 0px;
    min-width: 0px;
    padding-right: ${theme.size.sm};
  }

  ${({ cssProps }) => cssProps}

  @media (max-width: 900px) {
    min-width: 150px;
    ${({ cssOnMedia }) => cssOnMedia}
    :first-of-type {
      min-width: 0px;
    }
  }
`;
