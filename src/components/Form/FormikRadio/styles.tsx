import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';

export const CheckboxWrapper = styled.div<{ disable: boolean; labelColor: string }>`
  display: flex;

  gap: ${theme.size.xxsm};
  width: fit-content;
  align-items: center;
  transition: 0.25s;
  > input {
    width: 10px;
    height: 10px;
  }

  ${({ disable }) =>
    !disable &&
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
    font-size: 12px;
    line-height: 14px;
    font-weight: 500;
    color: ${({ labelColor }) => labelColor};
  }
`;

export const InputContainer = styled.div<{
  error: boolean;
  passwordPlaceholder?: boolean;
}>`
  ${({ error }) =>
    error &&
    `
   > input {
    border-color: ${theme.color.danger} !important;
    color: ${theme.color.danger};
    margin-bottom: 2px;
    }
 `}
`;

export const ErrorMessage = styled.div<{ errorColor: string }>`
  display: flex;
  color: ${({ errorColor }) => errorColor};

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
