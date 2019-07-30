import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledItem,
  StyledBubble,
  StyledWrapper,
  StyledAuthor,
  StyledDate,
} from './style';

const intlOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const Message = ({ message, color }) => {
  const dateTime = message.date
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
  const isSystem = message.author === 'System';

  return (
    <StyledItem isSystem={isSystem}>
      <StyledBubble isSystem={isSystem}>
        <StyledWrapper>
          {!isSystem && (
            <StyledAuthor color={color}>{message.author}</StyledAuthor>
          )}
          <div>{message.message}</div>
        </StyledWrapper>
        {!isSystem && (
          <StyledDate dateTime={dateTime}>
            {new Intl.DateTimeFormat('default', intlOptions).format(
              message.date,
            )}
          </StyledDate>
        )}
      </StyledBubble>
    </StyledItem>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    author: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  color: PropTypes.string,
};

Message.defaultProps = {
  color: 'black',
};

export default Message;
