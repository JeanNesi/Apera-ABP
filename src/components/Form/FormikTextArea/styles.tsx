import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const TextAreaContainer = styled.div<{ error: boolean; height: string }>`
  display: flex;
  flex-direction: column;
  > p {
    margin-bottom: ${theme.size.xxsm};
  }
  width: 100%;
  ${({ error }) =>
    error &&
    `
   > textarea {
    border-color: ${theme.color.danger} !important;
    color: ${theme.color.danger};
    margin-bottom: 2px;
  }
 `}
  ${({ height }) =>
    height &&
    `
  > textarea {
    height:${height} ;
  }`}
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
