import styled, { css } from 'styled-components';

import { overflowBreakWord, messageBaseStyle } from '../../utils/styles';
import {
  systemBackgroundColor,
  activeUserBackgroundColor,
} from '../../utils/colors';

const Item = styled.li`
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
`;

const Bubble = styled.div`
  ${messageBaseStyle}

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

export { Item, Bubble, Wrapper, Author, Message, Date };
