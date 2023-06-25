import { css, styled } from 'styled-components';
import { theme } from '../../styles/theme';

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: 0;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 76px);
  position: fixed;
  z-index: 12;
  box-shadow: 2px 0px 0px 0px rgba(0, 0, 0, 0.15);
  background: ${theme.color.primary};
  opacity: 1;
  top: 76px;
  transition: 0.1s linear;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transition: 0.2s;
      width: 270px;
    `}
`;

export const SidebarOptionsContainer = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;

  a:last-of-type {
    margin-top: auto;
  }
`;

export const SidebarOption = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  height: 56px;
  gap: ${theme.size.lg};
  padding: 0 ${theme.size.lg};
  opacity: 0.8;
  color: ${theme.color.gray1};
  font-size: 14px;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background: ${theme.color.dark25};
      opacity: 1;
      &::before {
        content: '';
        background-color: ${theme.color.light25};
        width: 2px;
        position: absolute;
        left: 0;
        height: 56px;
      }
    `}

  cursor: pointer;
  &:hover {
    background: ${theme.color.dark25};
    transition: 0.2s linear;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  gap: ${theme.size.lg};
  padding: 0 ${theme.size.lg};
  opacity: 0.8;
  color: ${theme.color.gray1};
  font-size: 14px;
  position: relative;
  z-index: 15;

  @media (min-width: 900px) {
    display: none;
  }
`;
