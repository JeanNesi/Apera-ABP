import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

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
