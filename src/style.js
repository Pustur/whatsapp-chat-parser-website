import styled from 'styled-components';

import { screenReaderOnly } from './utils/styles';

const StyledH1 = styled.h1`
  ${screenReaderOnly}
`;

export { StyledH1 };
