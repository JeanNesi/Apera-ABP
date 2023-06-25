import { Link } from 'react-router-dom';
import { icons } from '../../assets/icons';
import * as Style from './styles';
import { Search } from '../Search';

interface ISidebar {
  isOpen: boolean;
}

interface ISidebarContent {
  icon: string;
  label: string;
  url: string;
}

export const Sidebar = ({ isOpen }: ISidebar) => {
  const sidebarContent: ISidebarContent[] = [
    {
      icon: icons.home,
      label: 'Home',
      url: '/home',
    },
    {
      icon: icons.wallet,
      label: 'Carteiras',
      url: '/wallet',
    },
    {
      icon: icons.gear,
      label: 'Configurações',
      url: '/patrols',
    },
    {
      icon: icons.power,
      label: 'Sair',
      url: '/login',
    },
  ];

  return (
    <Style.SidebarContainer $isOpen={isOpen}>
      <Style.SearchContainer>
        <Search iconPosition="left" />
      </Style.SearchContainer>
      <Style.SidebarOptionsContainer>
        {sidebarContent.map(({ icon, label, url }) => (
          <Link to={url} key={url}>
            <Style.SidebarOption $isSelected={window.location.pathname === url}>
              <img src={icon} alt="" />
              <p>{label}</p>
            </Style.SidebarOption>
          </Link>
        ))}
      </Style.SidebarOptionsContainer>
    </Style.SidebarContainer>
  );
};
