import styled from 'styled-components';

import { whatsappGreenColor } from '../../utils/colors';
import { screenReaderOnly } from '../../utils/styles';

const Label = styled.label`
  display: block;
  border-radius: 10px;
  padding: 20px;
  border: 2px dashed
    ${props => (props.isHighlighted ? whatsappGreenColor : '#ccc')};
`;

const P = styled.p`
  margin: 0;
`;

const Extension = styled.span`
  font-family: monospace;
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 2px;
  display: inline-block;
  padding: 1px 3px;
`;

const Input = styled.input`
  ${screenReaderOnly}

  &:focus + ${Label} {
    border-color: ${whatsappGreenColor};
  }
`;

export { Label, P, Extension, Input };
