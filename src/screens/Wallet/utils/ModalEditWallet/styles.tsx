import { styled } from 'styled-components';
import { theme } from '../../../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  button {
    margin-top: ${theme.size.sm};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.sm};
  justify-content: center;
`;
