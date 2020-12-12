import styled, { css } from 'styled-components';

import { whatsappThemeColor } from '../../utils/colors';
import { screenReaderOnly } from '../../utils/styles';

const labelHighlight = css`
  background-color: #eee;
  border-color: ${whatsappThemeColor};

  @media (prefers-color-scheme: dark) {
    background-color: #333a3d;
  }
`;

const Label = styled.label`
  display: block;
  border-radius: 10px;
  padding: 20px;
  border: 2px dashed #ccc;
  cursor: pointer;
  ${props => props.isHighlighted && labelHighlight}

  @media (prefers-color-scheme: dark) {
    border-color: #666;
  }
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

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    border-color: #222;
  }
`;

const Input = styled.input`
  ${screenReaderOnly}

  &:focus + ${Label} {
    ${labelHighlight}
  }
`;

export { Label, P, Extension, Input };
