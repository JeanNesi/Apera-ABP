import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.size.md};

  @media (max-width: 900px) {
    img {
      display: none;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80dvh;
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 60%;

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

export const IbovespaInfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  h6 {
    color: ${theme.color.success};
  }
`;
