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

export const StockContainer = styled.div`
  display: flex;
  border-radius: ${theme.size.xxsm};
  box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.15);
  min-width: 248px;
  min-height: 135px;
  pointer-events: none;
`;
