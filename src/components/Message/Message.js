import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';

import Attachment from '../Attachment/Attachment';
import * as S from './style';

const intlOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const Message = ({
  message,
  color,
  isActiveUser,
  sameAuthorAsPrevious,
  zipFile,
}) => {
  const isSystem = message.author === 'System';
  const dateTime = message.date.toISOString().slice(0, 19).replace('T', ' ');

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
          {message.attachment ? (
            <Attachment
              fileName={message.attachment.fileName}
              zipFile={zipFile}
            />
          ) : (
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a
                  key={key}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={decoratedHref}
                >
                  {decoratedText}
                </a>
              )}
            >
              <S.Message>{message.message}</S.Message>
            </Linkify>
          )}
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
    date: PropTypes.instanceOf(Date).isRequired,
    author: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    attachment: PropTypes.shape({
      fileName: PropTypes.string.isRequired,
    }),
  }).isRequired,
  color: PropTypes.string,
  isActiveUser: PropTypes.bool,
  sameAuthorAsPrevious: PropTypes.bool,
  zipFile: PropTypes.instanceOf(Promise),
};

Message.defaultProps = {
  color: 'black',
  isActiveUser: false,
  sameAuthorAsPrevious: false,
  zipFile: null,
};

export default Message;
