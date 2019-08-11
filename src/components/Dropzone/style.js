import styled from 'styled-components';

import { whatsappGreenColor } from '../../utils/colors';
import { screenReaderOnly } from '../../utils/styles';

const StyledLabel = styled.label`
  display: block;
  border-radius: 10px;
  padding: 20px;
  border: 2px dashed
    ${props => (props.isHighlighted ? whatsappGreenColor : '#ccc')};
`;

const StyledP = styled.p`
  margin: 0;
`;

const StyledExtension = styled.span`
  font-family: monospace;
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 2px;
  display: inline-block;
  padding: 1px 3px;
`;

const StyledInput = styled.input`
  ${screenReaderOnly}

  &:focus + ${StyledLabel} {
    border-color: ${whatsappGreenColor};
  }
`;

export { StyledLabel, StyledP, StyledExtension, StyledInput };
