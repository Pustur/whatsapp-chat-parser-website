import React from 'react';
import PropTypes from 'prop-types';

import * as S from './style';

const intlOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const Message = ({ message, color, isActiveUser, sameAuthorAsPrevious }) => {
  const isSystem = message.author === 'System';
  const dateTime = message.date
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  return (
    <S.Item
      isSystem={isSystem}
      isActiveUser={isActiveUser}
      sameAuthorAsPrevious={sameAuthorAsPrevious}
    >
      <S.Bubble isSystem={isSystem} isActiveUser={isActiveUser}>
        <S.Wrapper>
          {!isSystem && !sameAuthorAsPrevious && (
            <S.Author color={color}>{message.author}</S.Author>
          )}
          <S.Message>{message.message}</S.Message>
        </S.Wrapper>
        {!isSystem && (
          <S.Date dateTime={dateTime}>
            {new Intl.DateTimeFormat('default', intlOptions).format(
              message.date,
            )}
          </S.Date>
        )}
      </S.Bubble>
    </S.Item>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    author: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  color: PropTypes.string,
  isActiveUser: PropTypes.bool,
  sameAuthorAsPrevious: PropTypes.bool,
};

Message.defaultProps = {
  color: 'black',
  isActiveUser: false,
  sameAuthorAsPrevious: false,
};

export default Message;
