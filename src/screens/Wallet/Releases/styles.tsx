import { styled } from 'styled-components';
import { theme } from '../../../styles/theme';

export const StockCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};

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

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${theme.size.sm};
  width: fit-content;

  width: 100%;
`;
