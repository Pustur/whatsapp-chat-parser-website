import React, { useMemo } from 'react';
import { useAtomValue } from 'jotai';

import Message from '../Message/Message';
import * as S from './style';
import { messagesAtom, messagesDateBoundsAtom } from '../../stores/global';

import { authorColors } from '../../utils/colors';
import { globalFilterModeAtom } from '../../stores/filters';
import {
  convertDateInputStringIntoDate,
  filterMessagesByDate,
} from '../../utils/utils';

function MessageViewer({
  activeUser,
  participants,
  lowerLimit,
  upperLimit,
  startDateInputString,
  endDateInputString,
}) {
  const messages = useAtomValue(messagesAtom);
  const messagesDateBounds = useAtomValue(messagesDateBoundsAtom);
  const filterMode = useAtomValue(globalFilterModeAtom);
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

  const startDate = convertDateInputStringIntoDate(
    'start',
    startDateInputString,
  );
  const endDate = convertDateInputStringIntoDate('end', endDateInputString);

  const renderedMessages =
    filterMode === 'index'
      ? messages.slice(lowerLimit - 1, upperLimit)
      : filterMessagesByDate(messages, startDate, endDate);

  const isLimited =
    renderedMessages.length !== messages.length ||
    messagesDateBounds.start.valueOf() < startDate.valueOf() ||
    messagesDateBounds.end.valueOf() > endDate.valueOf();

  return (
    <S.Container>
      {messages.length > 0 && (
        <S.P>
          <S.Info>
            {isLimited && filterMode === 'index' && (
              <span>
                Showing messages {lowerLimit} to{' '}
                {Math.min(upperLimit, messages.length)} (
                {renderedMessages.length} out of {messages.length})
              </span>
            )}
            {isLimited && filterMode === 'date' && (
              <span>
                Showing messages from {startDateInputString} to{' '}
                {endDateInputString}
              </span>
            )}
            {!isLimited && <span>Showing all {messages.length} messages</span>}
          </S.Info>
        </S.P>
      )}

      <S.List>
        {renderedMessages.map((message, i, arr) => {
          const prevMessage = arr[i - 1];

          return (
            <Message
              key={message.index}
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
