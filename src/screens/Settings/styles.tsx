import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Background = styled.div`
  height: 68vh;
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

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const UserImage = styled.img`
  border-radius: 50%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
`;
