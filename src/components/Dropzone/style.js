import styled from 'styled-components';

import { labelHighlightColor } from '../../utils/colors';
import { screenReaderOnly } from '../../utils/styles';

const StyledLabel = styled.label`
  display: block;
  border-radius: 10px;
  padding: 20px;
  border: 2px dashed
    ${props => (props.isHighlighted ? labelHighlightColor : '#ccc')};
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
    border-color: ${labelHighlightColor};
  }
`;

export { StyledLabel, StyledP, StyledExtension, StyledInput };
