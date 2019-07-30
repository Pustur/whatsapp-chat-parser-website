import styled from 'styled-components';

import { labelHighlightColor } from '../../utils/colors';
import bgImage from '../../img/bg.png';

const StyledContainer = styled.div`
  flex-grow: 1;
  padding: 0 1rem;
  background-color: #d0dfef;
  background-image: url(${bgImage});

  @media (min-width: 700px) {
    padding: 0 10%;
  }
`;

const StyledList = styled.ul`
  padding: 0;
  list-style: none;
`;

const StyledP = styled.p`
  text-align: center;
`;

const StyledInfo = styled.span`
  display: inline-block;
  padding: 8px 10px;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  background-color: ${labelHighlightColor};
  color: white;
`;

export { StyledContainer, StyledList, StyledP, StyledInfo };
