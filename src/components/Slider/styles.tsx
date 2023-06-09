import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

export const SliderContainer = styled.div`
  .slider {
    cursor: grab;
    overflow: hidden;
    padding: 8px 8px;
  }

  .sliderContent {
    display: flex;
    gap: ${theme.size.sm};
  }
`;
