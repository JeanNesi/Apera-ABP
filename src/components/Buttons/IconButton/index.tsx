import { theme } from '../../../styles/theme';
import { ContainerButton } from './styles';

interface IIconButton {
  icon: string;
  gap?: string;
  color?: string;
  label?: string;
  opacity?: string;
  className?: string;
  labelPos?: 'left' | 'right' | 'top' | 'bottom';
  selected?: boolean;
  onClick: () => void;
  hideLabelOnMedia?: boolean;
  fontWeight?: string;
  size?: string;
  disabled?: boolean;
}

export const IconButton = ({
  labelPos = 'left',
  opacity = '0.5',
  label,
  icon,
  gap = theme.size.xxsm,
  color = theme.color.gray4,
  selected,
  onClick,
  className = 'p2',
  hideLabelOnMedia,
  fontWeight = '500',
  disabled = false,
}: IIconButton) => (
  <ContainerButton
    style={{ pointerEvents: disabled ? 'none' : 'auto' }}
    $hideLabelOnMedia={hideLabelOnMedia}
    $labelPos={labelPos}
    $selected={selected}
    $opacity={opacity}
    $gap={gap}
    $color={color}
    $fontWeight={fontWeight}
    $disable={disabled}
    onClick={() => {
      onClick();
    }}
  >
    <img src={icon} alt="" />
    {label && <p className={className}>{label}</p>}
  </ContainerButton>
);
