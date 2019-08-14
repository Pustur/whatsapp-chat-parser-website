import styled from 'styled-components';

import { whatsappGreenColor, viewerBackgroundColor } from '../../utils/colors';

import bgImage from '../../img/bg.png';

const Container = styled.div`
  flex-grow: 1;
  padding: 0 1rem;
  background-color: ${viewerBackgroundColor};
  background-image: url(${bgImage});

  @media (min-width: 700px) {
    padding: 0 10%;
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
  display: inline-block;
  padding: 8px 10px;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  background-color: ${whatsappGreenColor};
  color: white;
`;

export { Container, List, P, Info };
