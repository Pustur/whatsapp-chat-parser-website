import styled, { css } from 'styled-components';

import { whatsappGreenColor } from '../../utils/colors';
import { screenReaderOnly } from '../../utils/styles';

const labelHighlight = css`
  background-color: #eee;
  border-color: ${whatsappGreenColor};
`;

const Label = styled.label`
  display: block;
  border-radius: 10px;
  padding: 20px;
  border: 2px dashed #ccc;
  ${props => props.isHighlighted && labelHighlight}
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
    ${labelHighlight}
  }
`;

export { Label, P, Extension, Input };
