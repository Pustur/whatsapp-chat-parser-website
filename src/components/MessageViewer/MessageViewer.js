import React from 'react';
import PropTypes from 'prop-types';

import Message from '../Message/Message';

const limit = 100;

const MessageViewer = ({ messages }) => {
  const renderedMessages =
    messages.length > limit ? messages.slice(0, limit) : messages;
  const isLimited = renderedMessages.length !== messages.length;

  return (
    <>
      <h1>
        Showing {isLimited && 'first'} {renderedMessages.length} messages{' '}
        {isLimited && (
          <span>(out of {messages.length} for performance reasons)</span>
        )}
      </h1>

      <ul>
        {renderedMessages.map(message => {
          const key = `${message.date.getTime()}_${message.message}`;
          return <Message key={key} message={message} />;
        })}
      </ul>
    </>
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
};

export default MessageViewer;
