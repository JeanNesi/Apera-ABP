import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Background = styled.div`
  min-height: 85vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.size.sm} ${theme.size.md};
  background-color: ${theme.color.primary};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: ${theme.size.xsm};

  input {
    height: 56px;
  }

  > h2 {
    margin-bottom: ${theme.size.sm};
    color: ${theme.color.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 364px;

  display: flex;
  flex-direction: column;
  margin-top: ${theme.size.xxxxlg};

  img {
    width: 130px;
  }

  button {
    margin-top: ${theme.size.xsm};
  }
`;

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.size.xsm};
`;

export const RegisterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.size.sm};
  width: 100%;
  margin-top: ${theme.size.sm};

  > p {
    white-space: nowrap;
    color: ${theme.color.gray2};
  }

  > hr {
    width: 100%;
    height: 1px;
    border: none;
    background: ${theme.color.gray2};
  }
`;
