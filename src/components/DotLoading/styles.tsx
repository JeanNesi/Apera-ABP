import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const LoadingContainer = styled.div<{ $bgColor: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .dot-pulse {
    position: relative;
    left: -9999px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${({ $bgColor }) => $bgColor};
    color: ${({ $bgColor }) => $bgColor};
    box-shadow: 9999px 0 0 -5px ${({ $bgColor }) => $bgColor};
    animation: dotPulse 1.5s infinite linear;
    animation-delay: 0.25s;
  }

  .dot-pulse::before,
  .dot-pulse::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${({ $bgColor }) => $bgColor};
    color: ${({ $bgColor }) => $bgColor};
  }

  .dot-pulse::before {
    box-shadow: 9984px 0 0 -5px ${({ $bgColor }) => $bgColor};
    animation: dotPulseBefore 1.5s infinite linear;
    animation-delay: 0s;
  }

  .dot-pulse::after {
    box-shadow: 10014px 0 0 -5px ${({ $bgColor }) => $bgColor};
    animation: dotPulseAfter 1.5s infinite linear;
    animation-delay: 0.5s;
  }

  @keyframes dotPulseBefore {
    0% {
      box-shadow: 9984px 0 0 -5px ${({ $bgColor }) => $bgColor};
    }
    30% {
      box-shadow: 9984px 0 0 2px ${({ $bgColor }) => $bgColor};
    }
    60%,
    100% {
      box-shadow: 9984px 0 0 -5px ${({ $bgColor }) => $bgColor};
    }
  }

  @keyframes dotPulse {
    0% {
      box-shadow: 9999px 0 0 -5px ${({ $bgColor }) => $bgColor};
    }
    30% {
      box-shadow: 9999px 0 0 2px ${({ $bgColor }) => $bgColor};
    }
    60%,
    100% {
      box-shadow: 9999px 0 0 -5px ${({ $bgColor }) => $bgColor};
    }
  }

  @keyframes dotPulseAfter {
    0% {
      box-shadow: 10014px 0 0 -5px ${({ $bgColor }) => $bgColor};
    }
    30% {
      box-shadow: 10014px 0 0 2px ${({ $bgColor }) => $bgColor};
    }
    60%,
    100% {
      box-shadow: 10014px 0 0 -5px ${({ $bgColor }) => $bgColor};
    }
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${theme.size.xsm};

  opacity: 0.7;
`;
