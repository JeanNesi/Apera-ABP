import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80dvh;
`;

export const StockDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.size.sm};
`;

export const StockDetailsLeftSide = styled.div`
  display: flex;
  gap: ${theme.size.md};
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    border-radius: ${theme.size.xxsm};
  }
`;

export const StockDetailsRightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  div {
    display: flex;
    gap: ${theme.size.lg};
  }
`;

export const FavoriteButton = styled.button`
background-color: transparent;
`;

export const StockValuesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: ${theme.size.sm};
  margin: ${theme.size.lg} 0;

  @media (max-width: 568px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StockValuesContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  div {
    display: flex;
    align-items: center;
    gap: ${theme.size.sm};

    img {
      width: 32px;
    }
  }
`;
