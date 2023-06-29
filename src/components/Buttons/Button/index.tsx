/* eslint-disable react/button-has-type */

import { theme } from '../../../styles/theme';
import { Background, ContainerButton, SpinnerContent } from './styles';
import { IButton } from './types';

export const Button = ({
  label,
  icon,
  disable = false,
  loading = false,
  outlined = false,
  center = false,
  spinnerColor = theme.color.white,
  bgColor = theme.color.success,
  borderless = false,
  fullWidth = false,
  ...rest
}: IButton) => (
  <Background $center={center}>
    <ContainerButton
      $bgColor={bgColor}
      $loading={+loading}
      $disable={disable}
      $outlined={outlined}
      $borderless={borderless}
      $fullWidth={fullWidth}
    >
      <button {...rest} disabled={disable || loading}>
        {loading ? (
          <SpinnerContent $spinnerColor={spinnerColor} />
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
