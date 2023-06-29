import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Background = styled.div<{ $center: boolean }>`
  width: fit-content;
  ${({ $center }) => $center && `width: 100%; display: flex; justify-content: center;`}
  height: fit-content;
`;

export const SpinnerContent = styled.div<{ $spinnerColor?: string }>`
  display: none;
  align-items: center;
  justify-content: center;
  border: 3px solid ${({ $spinnerColor }) => $spinnerColor ?? theme.color.white};
  border-top: 3px solid ${theme.color.primary};
  border-radius: 50%;
  width: ${theme.size.sm};
  height: ${theme.size.sm};
  animation: spin 0.75s linear infinite;
  display: flex;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ContainerButton = styled.div<{
  $disable: boolean;
  $loading: number;
  $outlined: boolean;
  $bgColor: string;
  $borderless: boolean;
  $fullWidth: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'fit-content')};

  > :hover {
    opacity: 0.7;
    ${({ $outlined, $bgColor, $disable, $borderless }) =>
      $outlined && !$disable && !$borderless && `background-color: ${`${$bgColor}26`};`}
  }

  > button {
    transition: 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.size.xsm};
    width: 100%;

    > img {
      width: 24px;
      height: 24px;
    }

    ${({ $bgColor }) => $bgColor && `  background-color: ${$bgColor};`}

    ${({ $outlined, $bgColor }) =>
      $outlined &&
      `outline: 2px solid ${$bgColor}; outline-offset: -2px;  background-color: transparent; color:${$bgColor};`}

    ${({ $disable }) => $disable && 'opacity: 0.4; :hover {opacity: 0.4;} cursor: not-allowed; '}

    ${({ $borderless }) =>
      $borderless &&
      `
      background-color: transparent;
      border: none;
      outline: none;
      color: ${theme.color.danger};
      padding: 0;
    `}

    ${({ $loading, $fullWidth }) =>
      $loading && !$fullWidth
        ? `border-radius: 100%; padding: ${theme.size.xsm}; opacity: 1; pointer-events: none;`
        : 'height: 40px'}
  }
`;
