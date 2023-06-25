import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const SelectContainer = styled.div<{
  $error: boolean;
  $selectPlaceholderValue?: string;
}>`
  display: flex;
  flex-direction: column;
  > p {
    margin-bottom: 6px;
  }
  width: 100%;
  position: relative;

  ${({ $selectPlaceholderValue }) =>
    $selectPlaceholderValue === ''
      ? `
      > select {
        border-color: ${theme.color.gray2};
        color: #fffbfb
      }
      `
      : `
      > select {
          border-color: ${theme.color.gray4};
      }`}

  ${({ $error }) =>
    $error &&
    `
   > select {
    border-color: ${theme.color.danger} !important;
    color: ${theme.color.danger};
    margin-bottom: 2px;
  }
 `}
`;

export const ErrorMessage = styled.div`
  display: flex;
  color: ${theme.color.danger};
  > p {
    animation: scale-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    @keyframes scale-in-left {
      0% {
        transform: scale(0);
        transform-origin: 0% 50%;
        opacity: 1;
      }
      100% {
        transform: scale(1);
        transform-origin: 0% 50%;
        opacity: 1;
      }
    }
  }
`;
