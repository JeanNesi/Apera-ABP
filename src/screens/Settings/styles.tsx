import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Background = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.size.sm} ${theme.size.md};
  background-color: ${theme.color.primary};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: ${theme.size.xsm};

  > h2 {
    margin-bottom: ${theme.size.sm};
    color: ${theme.color.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const UserImage = styled.img`
  border-radius: 50%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
`;

export const Card = styled.div`
  box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.15);
  padding: ${theme.size.md};
  max-width: 900px;
  width: 100%;
  border-radius: ${theme.size.xsm};
  display: flex;
  gap: ${theme.size.md};
`;

export const CardLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${theme.color.dark25};
  padding-right: ${theme.size.md};
  min-width: 200px;

  > img {
    width: 120px;
  }

  button {
    background: transparent;
    width: 100%;
    text-align: start;
  }
`;

export const MenuButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: auto;

  > div {
    border-top: 1px solid ${theme.color.dark25};
    padding: 12px 0;
    width: 100%;
    justify-content: flex-start;
  }
`;

export const SignoutButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  :nth-child(1) {
    width: fit-content;
    justify-content: flex-start;
  }
`;

export const CardRightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
`;
