import { css, styled } from 'styled-components';
import { theme } from '../../styles/theme';

export const StockContainer = styled.div`
  display: flex;
  border-radius: ${theme.size.xxsm};
  box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.15);
  min-width: 248px;
  min-height: 135px;
  pointer-events: none;
  justify-content: space-between;
  padding: ${theme.size.md};
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  .p3 {
    text-transform: uppercase;
  }
  :last-child {
    margin-top: ${theme.size.xsm};
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  img {
    width: 42px;
    border-radius: ${theme.size.xxsm};
  }
`;

export const VariationContainer = styled.div<{ $variation: number }>`
  display: flex;
  align-items: center;
  gap: ${theme.size.xxsm};

  ${({ $variation }) =>
    $variation > 0 &&
    css`
      color: ${theme.color.success};
    `}

  ${({ $variation }) =>
    $variation < 0 &&
    css`
      color: ${theme.color.danger};
    `}
`;
