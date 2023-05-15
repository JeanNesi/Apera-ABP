import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Background = styled.div`
  min-height: 100vh;
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

  background-color: ${theme.color.white};
  border-radius: ${theme.size.xxsm};
  gap: ${theme.size.xsm};
  padding: ${theme.size.md};

  .forgotPassword {
    height: 16px;
    margin-top: 0;
    color: ${theme.color.secondary};
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
  max-width: 450px;

  display: flex;
  flex-direction: column;
  margin-top: ${theme.size.xxxxlg};

  button {
    margin-top: ${theme.size.xsm};
  }
`;
