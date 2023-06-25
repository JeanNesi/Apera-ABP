import { theme } from '../../styles/theme';
import { LoadingContainer, LoadingWrapper } from './styles';

export const DotLoading = ({ label, bgColor = theme.color.gray1 }: IDotLoading) => (
  <LoadingContainer $bgColor={bgColor}>
    <LoadingWrapper>
      <h4>{label}</h4>
      <div>
        <div className="dot-pulse" />
      </div>
    </LoadingWrapper>
  </LoadingContainer>
);
