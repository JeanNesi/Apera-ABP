import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import * as Style from './styles';
import { useContext, useEffect, useState } from 'react';
import { IconButton } from '../Buttons/IconButton';
import { icons } from '../../assets/icons';
import { AuthContext } from '../../context/AuthContext';
import { Sidebar } from '../Sidebar';
import { Search } from '../Search';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    if (window.location.href.endsWith('/')) {
      navigate('/login');
    }
    setSidebarIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Style.NavbarContainer>
        <Style.NavbarContent>
          <Style.LeftSide>
            <IconButton
              icon={icons.hamburgerMenu}
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            />
            <img src={icons.aperaLogo} alt="" />
          </Style.LeftSide>

          <Style.RightSide>
            <Style.SearchContainer>
              <Search />
            </Style.SearchContainer>
            <img src={user?.profilePicture} alt="" />
          </Style.RightSide>
        </Style.NavbarContent>
      </Style.NavbarContainer>

      <Sidebar isOpen={sidebarIsOpen} />

      <Style.AppContent>
        <Outlet />
      </Style.AppContent>
    </>
  );
};
