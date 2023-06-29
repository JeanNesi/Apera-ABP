import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
            <Link to="/home">
              <img src={icons.aperaLogo} alt="" />
            </Link>
          </Style.LeftSide>

          <Style.RightSide>
            <Style.SearchContainer>
              <Search />
            </Style.SearchContainer>
            <Link to="/settings">
              <img src={user?.profilePicture} alt="" onClick={() => navigate('/settings')} />
            </Link>
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
