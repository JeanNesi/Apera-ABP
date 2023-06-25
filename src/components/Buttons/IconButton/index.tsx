import { theme } from '../../../styles/theme';
import { ContainerButton } from './styles';

export const IconButton = ({
  labelPos = 'left',
  opacity = '0.5',
  label,
  icon,
  gap = theme.size.xxsm,
  color = theme.color.success,
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
