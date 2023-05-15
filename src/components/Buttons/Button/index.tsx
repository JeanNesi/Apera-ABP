/* eslint-disable react/button-has-type */
// COMPONENTS
import { theme } from '../../../styles/theme';
import { Background, ContainerButton, SpinnerContent } from './styles';

// TYPES
import { IButton } from './utils/types';

export const Button = ({
  label,
  disable = false,
  loading = false,
  outlined = false,
  align,
  bgColor = theme.color.primary,
  borderless = false,
  color = theme.color.white,
  ...rest
}: IButton) => (
  <Background align={align}>
    <ContainerButton
      bgColor={bgColor}
      loading={+loading}
      disable={disable}
      outlined={outlined}
      borderless={borderless}
      color={color}
    >
      <button {...rest} disabled={disable || loading}>
        {loading ? <SpinnerContent /> : <p className="p2">{label}</p>}
      </button>
    </ContainerButton>
  </Background>
);
