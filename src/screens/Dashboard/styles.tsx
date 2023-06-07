import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

export const StockContainer = styled.div`
  display: flex;
  border-radius: ${theme.size.xxsm};
  box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.15);
  min-width: 248px;
  min-height: 135px;
  pointer-events: none;
`;
