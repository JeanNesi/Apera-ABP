import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80dvh;
`;

export const StockCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};

  justify-content: center;

  img {
    width: 36px;
    border-radius: ${theme.size.xxsm};
  }
`;

export const NoResultsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${theme.size.xsm};
  height: 70dvh;

  img {
    width: 50%;
  }

  h5 {
    margin-top: ${theme.size.md};
    max-width: 300px;
    text-align: center;
    color: ${theme.color.secondary};
  }
`;
