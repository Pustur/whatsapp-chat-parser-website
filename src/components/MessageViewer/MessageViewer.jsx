import React, { useMemo } from 'react';

import Message from '../Message/Message';
import * as S from './style';

import { authorColors } from '../../utils/colors';

function MessageViewer({
  messages,
  activeUser,
  participants,
  lowerLimit,
  upperLimit,
}) {
  const colorMap = useMemo(
    () =>
      participants.reduce(
        (obj, participant, i) => ({
          ...obj,
          [participant]: authorColors[i % authorColors.length],
        }),
        {},
      ),
    [participants],
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
            />
          );
        })}
      </S.List>
    </S.Container>
  );
}

export default React.memo(MessageViewer);
