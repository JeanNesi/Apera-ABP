/* eslint-disable react/button-has-type */

import { ButtonHTMLAttributes } from 'react';
import { theme } from '../../../styles/theme';
import { Background, ContainerButton, SpinnerContent } from './styles';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: string;
  bgColor?: string;
  disable?: boolean;
  outlined?: boolean;
  loading?: boolean;
  center?: boolean;
  borderless?: boolean;
  fullWidth?: boolean;
}

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
