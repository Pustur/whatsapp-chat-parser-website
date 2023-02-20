import styled, { css, createGlobalStyle } from 'styled-components';

import { normalizeInput } from './utils/styles';
import { whatsappThemeColor } from './utils/colors';

const selectArrowWidth = '10px';
const selectArrowHeight = '5px';
const selectPadding = '0.3rem';
const inputStyles = css`
  ${normalizeInput}

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 100%;
  height: 1.8rem;
  padding: 0 0.3rem;
  background-color: #fafafa;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.07);

  @media (prefers-color-scheme: dark) {
    background-color: #222;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Form = styled.form`
  > * + * {
    margin-top: 1rem;
  }
`;

const Field = styled.div`
  * + * {
    margin-top: 0.375rem;
  }

  & + & {
    margin-top: 1rem;
  }
`;

const RadioField = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;

  & + & {
    margin-top: 0.5rem;
  }
`;

const Label = styled.label`
  display: block;
  opacity: 0.8;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const Fieldset = styled.fieldset`
  margin: 0;
  border: 1px solid #eee;

  @media (prefers-color-scheme: dark) {
    border-color: #444;
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}

  padding: 0 calc(${selectPadding} * 2 + ${selectArrowWidth}) 0
    ${selectPadding};
  background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
    linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position: calc(100% - ${selectPadding} - ${selectArrowWidth} / 2)
      60%,
    calc(100% - ${selectPadding}) 60%;
  background-size: calc(${selectArrowWidth} / 2) ${selectArrowHeight};
  background-repeat: no-repeat;

  &:disabled {
    opacity: 0.5;
  }
`;

const Submit = styled.input`
  ${normalizeInput}

  border: 0;
  border-radius: 4px;
  width: 100%;
  height: 1.8rem;
  padding: 0 0.3rem;
  background-color: ${whatsappThemeColor};
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const InputDescription = styled.div`
  font-size: 80%;
  opacity: 0.6;
`;

const Header = styled.header`
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

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-family: sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 
      'Segoe UI Symbol', 'Noto Color Emoji';
    box-sizing: border-box;
  }

  body {
    margin: 0;
    color: #333;
  }

  a {
    text-decoration: none;
    color: ${whatsappThemeColor};
  }

  img,
  video,
  audio {
    max-width: 100%;
  }

  button {
    cursor: pointer;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background-color: #262d31;
      color: #ccc;
    }
  }

  @media print {
    video, audio, ${Header}, .menu-open-button {
      display: none !important;
    }
  }
`;

export {
  GlobalStyles,
  Container,
  Form,
  Field,
  RadioField,
  Label,
  Fieldset,
  Input,
  Select,
  Submit,
  InputDescription,
  Header,
};
