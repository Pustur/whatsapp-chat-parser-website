import styled, { css, keyframes } from 'styled-components';

import { overflowBreakWord, messageBaseStyle } from '../../utils/styles';
import {
  systemBackgroundColor,
  systemDarkBackgroundColor,
  activeUserBackgroundColor,
  activeUserDarkBackgroundColor,
} from '../../utils/colors';

const Item = styled.li<{
  isSystem: boolean;
  isActiveUser: boolean;
  sameAuthorAsPrevious: boolean;
}>`
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  ${props =>
    props.isSystem &&
    css`
      text-align: center;
    `}
  ${props =>
    props.isActiveUser &&
    css`
      text-align: right;
    `}
  ${props =>
    props.sameAuthorAsPrevious &&
    css`
      margin-top: 0.25rem;
    `}

  a {
    color: #68bbe4;
    text-decoration: underline;
  }
`;

const Index = styled.div<{ isSystem: boolean; isActiveUser: boolean }>`
  position: absolute;
  font-size: 10px;
  padding-inline: 7px;
  border-radius: 99px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  top: -0.5em;
  right: -0.5em;
  background-color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  ${props =>
    props.isSystem &&
    css`
      background-color: ${systemBackgroundColor};
    `}
  ${props =>
    props.isActiveUser &&
    css`
      background-color: ${activeUserBackgroundColor};
    `}

  .ctrl-down & {
    opacity: 1;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #262d31;
    border-color: rgba(255, 255, 255, 0.1);
    color: #f1f1f2;
    ${props =>
      props.isSystem &&
      css`
        background-color: ${systemDarkBackgroundColor};
      `}
    ${props =>
      props.isActiveUser &&
      css`
        background-color: ${activeUserDarkBackgroundColor};
      `}
  }
`;

const Bubble = styled.div<{ isSystem: boolean; isActiveUser: boolean }>`
  ${messageBaseStyle}

  position: relative;
  background-color: white;
  ${props =>
    props.isSystem &&
    css`
      background-color: ${systemBackgroundColor};
    `}
  ${props =>
    props.isActiveUser &&
    css`
      text-align: left;
      background-color: ${activeUserBackgroundColor};
    `}

  @media (max-width: 699px) {
    flex-direction: column;
  }

  @media (min-width: 700px) {
    max-width: 65%;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #262d31;
    color: #f1f1f2;
    ${props =>
      props.isSystem &&
      css`
        background-color: ${systemDarkBackgroundColor};
        color: #fad964;
      `}
    ${props =>
      props.isActiveUser &&
      css`
        background-color: ${activeUserDarkBackgroundColor};
      `}
  }

  &:hover {
    ${Index} {
      opacity: 1;
    }
  }
`;

const Wrapper = styled.div`
  flex: 1 1 auto;
`;

const Author = styled.div`
  margin-bottom: 0.25rem;
  font-weight: bold;
  font-size: 75%;
  color: ${props => props.color};
`;

const bounceIn = keyframes`
  0% {
    transform: scale(0.1);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`;

const CopyToClipboard = styled.div`
  margin-bottom: 0.25rem;
  font-weight: bold;
  &.animate {
    animation: ${bounceIn} 2s forwards;
  }
  &:hover {
    cursor: pointer;
  }
  position: absolute;
  right: 0;
  top: 0;
  color: ${props => props.color};
`;

const Message = styled.div`
  ${overflowBreakWord}

  white-space: pre-wrap;
`;

const Date = styled.time`
  flex: 0 0 auto;
  align-self: flex-end;
  margin-left: 1rem;
  white-space: nowrap;
  font-size: 75%;
  opacity: 0.6;

  @media (max-width: 699px) {
    margin-top: 0.25rem;
  }
`;

export { Item, Bubble, Index, Wrapper, Author, Message, Date, CopyToClipboard };
