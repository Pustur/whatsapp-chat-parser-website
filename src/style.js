import styled from 'styled-components';

import { screenReaderOnly } from './utils/styles';

const StyledH1 = styled.h1`
  ${screenReaderOnly}
`;

const StyledHeader = styled.header`
  padding: 10px;
  display: flex;
  align-items: center;

  > *:first-child {
    flex: 1 1 auto;
  }

  @media (max-width: 699px) {
    flex-direction: column;

    > * + * {
      margin-top: 0.5rem;
    }
  }

  @media (min-width: 700px) {
    > * + * {
      margin-left: 1rem;
    }
  }
`;

export { StyledH1, StyledHeader };
