import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

export const SearchContainer = styled.div`
  display: flex;
  gap: ${theme.size.sm};
  align-items: center;

  input {
    height: 30px;
  }
`;
