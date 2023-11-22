import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';
import { ITab } from './types';

export const Background = styled.div`
  min-height: 85vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.size.sm} ${theme.size.md};
  background-color: ${theme.color.primary};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: ${theme.size.sm};

  > h2 {
    margin-bottom: ${theme.size.sm};
    color: ${theme.color.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  margin-top: ${theme.size.xxxxlg};
  box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.15);
  padding: ${theme.size.md};
  border-radius: ${theme.size.xsm};

  img {
    width: 130px;
  }

  button {
    margin-top: ${theme.size.xsm};
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TabsHeader = styled.div`
  display: flex;
  margin-bottom: ${theme.size.sm};
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
