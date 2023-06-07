import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';

export const CheckboxWrapper = styled.div<{ $disable: boolean; $labelColor: string }>`
  display: flex;
  align-items: flex-start;
  gap: ${theme.size.xxsm};
  width: fit-content;
  transition: 0.25s;
  > input {
    width: 16px;
    height: 16px;
    accent-color: ${theme.color.primary};
  }

  ${({ $disable }) =>
    !$disable &&
    css`
      > input {
        cursor: pointer;
      }

      > label {
        color: ${theme.color.black};
        cursor: pointer;
        :hover {
          opacity: 0.7;
        }
      }
    `}

  > label {
    font-size: 14px;
    line-height: 16px;
    color: ${({ $labelColor }) => $labelColor};
  }
`;

export const InputContainer = styled.div<{
  $error: boolean;
}>`
  ${({ $error }) =>
    $error &&
    `
   > input {
    border-color: ${theme.color.danger} !important;
    color: ${theme.color.danger};
    margin-bottom: 2px;
    }
 `}
`;

export const ErrorMessage = styled.div<{ $errorColor: string }>`
  display: flex;
  color: ${({ $errorColor }) => $errorColor};

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
