import { css } from 'styled-components';

const screenReaderOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const hideText = css`
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
`;

const normalizeButton = css`
  font-size: 100%;
  font-family: inherit;
  padding: 0;
  border: 0;
  margin: 0;
  appearance: none;
  box-shadow: none;
`;

const normalizeInput = css`
  appearance: none;
  font: inherit;
  color: inherit;
`;

const overflowBreakWord = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`;

const messageBaseStyle = css`
  display: inline-flex;
  padding: 8px 10px;
  border-radius: 6px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
`;

export {
  screenReaderOnly,
  hideText,
  normalizeButton,
  normalizeInput,
  overflowBreakWord,
  messageBaseStyle,
};
