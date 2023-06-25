// UI
import * as Style from './styles';
// ICONS
import { icons } from '../../assets/icons';

// TYPES
import { IModal } from './types';
import { theme } from '../../styles/theme';
import { IconButton } from '../Buttons/IconButton';

export const Modal = ({ children, setModal, title }: IModal) => (
  <Style.Background
    id="background"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onMouseDown={(evt: any) => {
      if (evt.target.id === 'background') setModal(false);
    }}
  >
    <Style.Body>
      <Style.Header>
        <h6>{title}</h6>
        <IconButton
          icon={icons.x}
          color={theme.color.primary}
          onClick={() => {
            setModal(false);
          }}
        />
      </Style.Header>
      {children}
    </Style.Body>
  </Style.Background>
);
