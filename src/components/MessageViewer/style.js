import styled from 'styled-components';

import {
  whatsappThemeColor,
  viewerBackgroundColor,
  viewerDarkBackgroundColor,
} from '../../utils/colors';
import { messageBaseStyle } from '../../utils/styles';

import bgImage from '../../img/bg.png';
import bgDarkImage from '../../img/bg-dark.png';

const Container = styled.div`
  flex-grow: 1;
  padding: 0 1rem;
  background-color: ${viewerBackgroundColor};
  background-image: url(${bgImage});

  @media (min-width: 700px) {
    padding: 0 10%;
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${viewerDarkBackgroundColor};
    background-image: url(${bgDarkImage});
  }
`;

const List = styled.ul`
  padding: 0;
  list-style: none;
`;

const P = styled.p`
  text-align: center;
`;

const Info = styled.span`
  ${messageBaseStyle}

  text-align: center;
  background-color: ${whatsappThemeColor};
  color: white;
`;

export { Container, List, P, Info };
