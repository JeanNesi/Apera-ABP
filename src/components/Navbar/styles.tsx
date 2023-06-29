import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

export const NavbarContainer = styled.header`
  display: flex;
  justify-content: center;
  position: sticky;
  background: ${theme.color.primary};
  top: 0;
  z-index: 12;
  min-height: 76px;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(16, 16, 16, 0.15);
`;

export const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${theme.size.lg};
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.md};

  a {
    > img {
      height: 36px;
    }
  }

  > img {
    height: 36px;
  }
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.md};

  a {
    width: 36px;

    > img {
      height: 40px;
      cursor: pointer;
      border-radius: 50%;
    }
  }

  > img {
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }
`;

export const AppContent = styled.main`
  width: 100%;
  margin: 0 auto;

  max-width: 1196px;
  padding: ${theme.size.xlg} ${theme.size.md};

  @media (max-width: 900px) {
    padding: ${theme.size.sm};
  }
`;

export const SearchContainer = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;
