import React from 'react';
import PropTypes from 'prop-types';

import Message from '../Message/Message';
import { StyledContainer, StyledList, StyledP, StyledInfo } from './style';

const MessageViewer = ({ messages, limit }) => {
  const renderedMessages =
    messages.length > limit ? messages.slice(0, limit) : messages;
  const isLimited = renderedMessages.length !== messages.length;

  return (
    <StyledContainer>
      {messages.length > 0 && (
        <StyledP>
          <StyledInfo>
            Showing {isLimited && 'first'} {renderedMessages.length} messages{' '}
            {isLimited && (
              <span>(out of {messages.length} for performance reasons)</span>
            )}
          </StyledInfo>
        </StyledP>
      )}

      <StyledList>
        {renderedMessages.map(message => {
          const key = `${message.date.getTime()}_${message.message}`;
          return <Message key={key} message={message} />;
        })}
      </StyledList>
    </StyledContainer>
  );
};

MessageViewer.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      author: PropTypes.string,
      message: PropTypes.string,
    }),
  ).isRequired,
  limit: PropTypes.number,
};

MessageViewer.defaultProps = {
  limit: Infinity,
};

export default MessageViewer;
