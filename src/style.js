import styled, { css, createGlobalStyle } from 'styled-components';

import { hideText, normalizeButton, normalizeInput } from './utils/styles';
import { whatsappThemeColor } from './utils/colors';
import { zIndex } from './utils/z-index';

const buttonSize = '44px';
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
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const MenuOpenButton = styled.button`
  ${normalizeButton}
  ${hideText}

  position: fixed;
  width: ${buttonSize};
  height: ${buttonSize};
  left: 1rem;
  bottom: 1rem;
  border-radius: 50%;
  background-color: ${whatsappThemeColor};

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 16px;
    height: 2px;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: white;
    box-shadow: 0 -5px 0 white, 0 5px 0 white;
  }

  @media (min-width: 700px) {
    left: 2rem;
    bottom: 2rem;
  }
`;

const MenuCloseButton = styled.button`
  ${normalizeButton}
  ${hideText}

  position: absolute;
  width: ${buttonSize};
  height: ${buttonSize};
  top: 0;
  right: 0;
  background-color: transparent;
  opacity: 0.5;
  transition: opacity 0.3s ease;

  &:hover,
  &:focus {
    opacity: 1;
  }

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 20px;
    height: 2px;
    top: 50%;
    left: 50%;
    transform-origin: 50% 50%;
    background-color: black;
  }

  &::before {
    transform: translate3d(-50%, -50%, 0) rotate(45deg);
  }

  &::after {
    transform: translate3d(-50%, -50%, 0) rotate(135deg);
  }

  @media (prefers-color-scheme: dark) {
    &::before,
    &::after {
      background-color: white;
    }
  }
`;

const Overlay = styled.button`
  ${normalizeButton}

  display: block;
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: black;
  opacity: ${props => (props.isActive ? 0.2 : 0)};
  transition: opacity 0.3s ease;
  z-index: ${zIndex.overlay};
  ${props =>
    !props.isActive &&
    css`
      pointer-events: none;
    `}
`;

const Sidebar = styled.aside`
  position: fixed;
  width: 280px;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  transform: translate3d(${props => (props.isOpen ? 0 : '-100%')}, 0, 0);
  transition: transform 0.3s ease;
  z-index: ${zIndex.sidebar};

  @media (prefers-color-scheme: dark) {
    background-color: #262d31;
  }
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: ${buttonSize};
  left: 0;
  bottom: 0;
  right: 0;
  padding: 1rem;
  border-top: 1px solid #eee;

  @media (prefers-color-scheme: dark) {
    border-color: #444;
  }
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

const Label = styled.label`
  display: block;
  opacity: 0.8;
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

export {
  GlobalStyles,
  Container,
  MenuOpenButton,
  MenuCloseButton,
  Overlay,
  Sidebar,
  SidebarContainer,
  Form,
  Field,
  Label,
  Fieldset,
  Input,
  Select,
  Submit,
  InputDescription,
  Header,
};
