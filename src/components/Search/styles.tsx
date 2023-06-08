import { css, styled } from 'styled-components';
import { theme } from '../../styles/theme';

export const SearchContainer = styled.div<{ $iconPosition: string }>`
  display: flex;
  gap: ${theme.size.sm};
  align-items: center;

  ${({ $iconPosition }) =>
    $iconPosition === 'left' &&
    css`
      flex-direction: row-reverse;
    `}

  input {
    height: 30px;
  }
`;
