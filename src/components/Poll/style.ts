import styled from 'styled-components';
import {
  activeUserDarkBackgroundColor,
  viewerDarkBackgroundColor,
  whatsappThemeColor,
} from '../../utils/colors';

const Poll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Title = styled.div`
  font-weight: bolder;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Flex = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.8rem;
`;

const Progress = styled.progress`
  display: block;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 500px;
  height: 10px;
  appearance: none;
  border-radius: 99px;
  padding: 1px;

  &::-webkit-progress-bar {
    background-color: white;
    border-radius: 99px;
  }

  &::-webkit-progress-value {
    background-color: ${whatsappThemeColor};
    border-radius: 99px;
  }

  @media (prefers-color-scheme: dark) {
    &::-webkit-progress-bar {
      background-color: color-mix(
        in srgb,
        ${activeUserDarkBackgroundColor},
        ${viewerDarkBackgroundColor}
      );
    }
  }
`;

export { Poll, Title, Option, Flex, Progress };
