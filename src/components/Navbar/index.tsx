import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Style from './styles';
import { useContext, useEffect, useState } from 'react';
import { IconButton } from '../Buttons/IconButton';
import { icons } from '../../assets/icons';
import { AuthContext } from '../../context/AuthContext';
import { Search } from '../Search';
import { Sidebar } from '../Sidebar';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
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

            {localStorage.getItem('authToken') || user ? (
              <Link to="/settings">
                <img
                  src={user?.profilePicture ?? localStorage.getItem('profilePicture') ?? ''}
                  alt=""
                  onClick={() => navigate('/settings')}
                />
              </Link>
            ) : (
              <Style.NotLoggedButtonsContainer>
                <Link to="/login">Login</Link>

                <p>ou</p>

                <Link to="/signup">Cadastre-se</Link>
              </Style.NotLoggedButtonsContainer>
            )}
          </Style.RightSide>
        </Style.NavbarContent>
      </Style.NavbarContainer>

      <Sidebar isOpen={sidebarIsOpen} />
    </>
  );
};
