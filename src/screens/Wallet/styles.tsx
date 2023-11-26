import { css, styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { ITab } from './types';

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
    'a b d'
    'a c d';
  gap: ${theme.size.xsm};
  grid-gap: ${theme.size.xsm};
  box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.15);

  :nth-child(1) {
    grid-area: a;
  }

  :nth-child(2) {
    grid-area: b;
  }

  :nth-child(3) {
    grid-area: c;
  }

  :nth-child(4) {
    grid-area: d;
  }

  > img {
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

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabsHeader = styled.div`
  display: flex;
`;

export const Tab = styled.div<{ $activeTab: string; $tab: ITab }>`
  height: 28px;
  display: flex;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  position: relative;
  color: ${theme.color.white};
  &:hover {
    opacity: 0.7;
  }

  &::after {
    content: '';
    display: block;
    background: ${theme.color.primary};
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: 0;
    transition: 0.4s;
  }

  ${({ $tab, $activeTab }) =>
    $tab.value === $activeTab &&
    css`
      &::after {
        width: 100%;
        animation: tabWidthAnimation 0.4s;
        background: ${theme.color.secondary};
      }
    `}

  @keyframes tabWidthAnimation {
    0% {
      width: 0px;
    }
    100% {
      width: 100%;
    }
  }
`;

export const WalletButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
`;
