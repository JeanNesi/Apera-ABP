import { css, styled } from 'styled-components';
import { theme } from '../../../../styles/theme';

export const TransactionTypesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.md};
  justify-content: center;
  margin: ${theme.size.lg} 0;
`;

export const TransactionTypeButton = styled.button<{ $isSelected: boolean; $type: 'buy' | 'sale' }>`
  background: transparent;
  border: 1px solid ${theme.color.light25};
  color: ${theme.color.light25};
  width: 140px;
  height: 56px;
  transition: 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.size.xsm};

  svg path {
    transition: 0.2s linear;
  }

  ${({ $isSelected, $type }) =>
    $isSelected &&
    $type === 'buy' &&
    css`
      border: 1px solid ${theme.color.secondary};
      color: ${theme.color.secondary};

      svg path {
        fill: ${theme.color.secondary};
        transition: 0.2s linear;
      }
    `}

  ${({ $isSelected, $type }) =>
    $isSelected &&
    $type === 'sale' &&
    css`
      border: 1px solid ${theme.color.danger};
      color: ${theme.color.danger};
      svg path {
        fill: ${theme.color.danger};
        transition: 0.2s linear;
      }
    `}
`;

export const InputsWrapper = styled.div`
  display: flex;
  gap: ${theme.size.xsm};
`;
