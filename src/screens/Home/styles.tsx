import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import { icons } from '../../assets/icons';

export const Main = styled.main`
  margin: 0 auto;

  max-width: 1196px;
  padding: ${theme.size.xlg} ${theme.size.md};
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.size.md};
  /* background: ${theme.color.gray4}; */
  padding: 12px;
  border-radius: ${theme.size.sm};

  img {
    width: 400px;
  }

  @media (max-width: 900px) {
    img {
      display: none;
    }
  }
`;

export const BannerSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const BannerContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.8);
  background-image: url(${icons.banner});
  background-blend-mode: overlay;
  background-repeat: repeat;
  background-position: center;
  padding-top: 40px;
  background-size: cover;
  padding-bottom: 40px;

  width: 100%;
  min-height: 600px;
  min-width: 280px;
`;

export const BannerWrapper = styled.div`
  display: flex;
  max-width: 1158px;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.size.md};
  width: 100%;
  gap: ${theme.size.sm};

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
  align-items: flex-start;
  width: 100%;
  max-width: 655px;
  color: ${theme.color.white};

  button {
    margin-top: ${theme.size.xsm};
  }

  @media (max-width: 900px) {
    width: 100%;
    max-width: 100%;
    align-items: center;

    > h1 {
      font-size: 36px;
      line-height: 45px;
    }

    h5 {
      font-size: 18px;
      line-height: 23px;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80dvh;
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  margin-top: ${theme.size.sm};
  border-radius: ${theme.size.xsm};
  box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.15);
  padding: ${theme.size.md};
  gap: ${theme.size.sm};

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

export const IbovespaInfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
`;

export const IbovespaInfosContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: ${theme.size.md};
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StockVariantionPercentage = styled.h6<{ $percentage: number }>`
  color: ${({ $percentage }) => $percentage === 0 && theme.color.white};
  color: ${({ $percentage }) => $percentage > 0 && theme.color.success};
  color: ${({ $percentage }) => $percentage < 0 && theme.color.danger};
`;
