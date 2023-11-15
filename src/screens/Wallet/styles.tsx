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

  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transition: 0.2s;
  }

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

export const WalletInfosContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.size.sm};
  align-items: center;
  margin-bottom: ${theme.size.md};
`;

export const WalletInfosWrapper = styled.div`
  display: grid;
  min-width: 250px;

  grid-template-areas:
    'a b'
    'a c';
  gap: ${theme.size.xsm};
  grid-gap: ${theme.size.xsm};
  box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.15);

  :nth-child(1) {
    grid-area: a;
  }

  img {
    width: 24px;
    height: 24px;
  }

  padding: ${theme.size.sm};
  border-radius: ${theme.size.xsm};
  align-items: center;

  p {
    font-weight: 700;
  }
`;

export const VariationValueContainer = styled.p<{ $variation: number }>`
  color: ${({ $variation }) => $variation === 0 && theme.color.white};
  color: ${({ $variation }) => $variation > 0 && theme.color.support60};
  color: ${({ $variation }) => $variation < 0 && theme.color.danger};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${theme.size.md};
`;
