import React from 'react';
import PropTypes from 'prop-types';

const intlOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

const Message = ({ message }) => {
  const dateTime = message.date
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
  const isSystem = message.author === 'System';

  return (
    <li>
      {!isSystem && <div>{message.author}</div>}
      <div>{message.message}</div>
      <time dateTime={dateTime}>
        {new Intl.DateTimeFormat('default', intlOptions).format(message.date)}
      </time>
    </li>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    author: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

export default Message;
