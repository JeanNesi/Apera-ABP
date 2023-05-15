import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Background = styled.div<{ align?: string }>`
  width: fit-content;
  ${({ align }) => align && `width: 100%; display: flex; justify-content: ${align};`}
  height: fit-content;
`;

export const SpinnerContent = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  border: 3px solid ${theme.color.black};
  border-top: 3px solid ${theme.color.primary30};
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
  disable: boolean;
  loading: number;
  outlined: boolean;
  bgColor: string;
  borderless: boolean;
  color: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;

  > button {
    transition: 0.5s;
    display: flex;
    align-items: center;
    gap: ${theme.size.xsm};
    justify-content: center;
    color: ${({ color }) => color};
    height: 40px;
    min-width: 40px;

    :hover {
      opacity: 0.7;
      ${({ outlined, bgColor }) => outlined && `background-color: ${`${bgColor}26`};`}
    }

    ${({ bgColor }) => bgColor && `  background-color: ${bgColor};`}

    ${({ outlined, bgColor }) =>
      outlined &&
      `outline: 2px solid ${bgColor}; outline-offset: -2px;  background-color: transparent; color:${bgColor};`}

    ${({ disable }) => disable && 'opacity: 0.4; :hover {opacity: 0.4;} cursor: not-allowed; '}

    ${({ borderless }) =>
      borderless &&
      `
      background-color: transparent;
      border: none;
      outline: none;
      color: ${theme.color.danger};
      padding: 0;
    `}

    ${({ loading }) =>
      loading &&
      `border-radius: 100%; padding: ${theme.size.xsm}; opacity: 1; pointer-events: none;`}
  }
`;
