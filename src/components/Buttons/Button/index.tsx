/* eslint-disable react/button-has-type */
// COMPONENTS
import { theme } from '../../../styles/theme';
import { Background, ContainerButton, SpinnerContent } from './styles';

// TYPES
import { IButton } from './utils/types';

export const Button = ({
  label,
  icon,
  disable = false,
  loading = false,
  outlined = false,
  center = false,
  bgColor = theme.color.black,
  borderless = false,
  fullWidth = false,
  ...rest
}: IButton) => (
  <Background center={center}>
    <ContainerButton
      bgColor={bgColor}
      loading={+loading}
      disable={disable}
      outlined={outlined}
      borderless={borderless}
      fullWidth={fullWidth}
    >
      <button {...rest} disabled={disable || loading}>
        {loading ? (
          <SpinnerContent />
        ) : (
          <>
            <p className="p2">{label}</p>
            {icon && <img src={icon} alt="" />}
          </>
        )}
      </button>
    </ContainerButton>
  </Background>
);
