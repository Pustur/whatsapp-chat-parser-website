import React from 'react';
import PropTypes from 'prop-types';

import Message from '../Message/Message';
import * as S from './style';

import { authorColors } from '../../utils/colors';

const MessageViewer = ({
  messages,
  activeUser,
  participants,
  lowerLimit,
  upperLimit,
  zipFile,
}) => {
  const colorMap = participants.reduce(
    (obj, participant, i) => ({
      ...obj,
      [participant]: authorColors[i % authorColors.length],
    }),
    {},
  );
  const renderedMessages = messages.slice(lowerLimit - 1, upperLimit);
  const isLimited = renderedMessages.length !== messages.length;

  return (
    <S.Container>
      {messages.length > 0 && (
        <S.P>
          <S.Info>
            {isLimited ? (
              <span>
                Showing messages {lowerLimit} to{' '}
                {Math.min(upperLimit, messages.length)} (
                {renderedMessages.length} out of {messages.length})
              </span>
            ) : (
              <span>Showing all {messages.length} messages</span>
            )}
          </S.Info>
        </S.P>
      )}

      <S.List>
        {renderedMessages.map((message, i, arr) => {
          const prevMessage = arr[i - 1];

          return (
            <Message
              key={i} // eslint-disable-line react/no-array-index-key
              message={message}
              color={colorMap[message.author]}
              isActiveUser={activeUser === message.author}
              sameAuthorAsPrevious={
                prevMessage && prevMessage.author === message.author
              }
              zipFile={zipFile}
            />
          );
        })}
      </S.List>
    </S.Container>
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
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeUser: PropTypes.string.isRequired,
  lowerLimit: PropTypes.number,
  upperLimit: PropTypes.number,
  zipFile: PropTypes.instanceOf(Promise),
};

MessageViewer.defaultProps = {
  lowerLimit: 1,
  upperLimit: Infinity,
  zipFile: null,
};

export default React.memo(MessageViewer);
