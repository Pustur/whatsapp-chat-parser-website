import { Suspense } from 'react';
import Linkify from 'react-linkify';

import Attachment from '../Attachment/Attachment';
import Poll from '../Poll/Poll';
import * as S from './style';
import { IndexedMessage } from '../../types';
import { parsePollMessage } from '../../utils/poll-parser';

function Link(
  decoratedHref: string,
  decoratedText: string,
  key: number,
): React.ReactNode | undefined {
  return (
    <a key={key} target="_blank" rel="noopener noreferrer" href={decoratedHref}>
      {decoratedText}
    </a>
  );
}

interface IMessage {
  message: IndexedMessage;
  color: string;
  isActiveUser: boolean;
  sameAuthorAsPrevious: boolean;
}

function Message({
  message,
  color,
  isActiveUser,
  sameAuthorAsPrevious,
}: IMessage) {
  const isSystem = !message.author;
  const dateTime = message.date.toISOString().slice(0, 19).replace('T', ' ');
  const pollData = parsePollMessage(message.message);
  let messageComponent = (
    <Linkify componentDecorator={Link}>
      <S.Message>{message.message}</S.Message>
    </Linkify>
  );

  if (message.attachment) {
    messageComponent = (
      <Suspense fallback={`Loading ${message.attachment.fileName}...`}>
        <Attachment fileName={message.attachment.fileName} />
      </Suspense>
    );
  } else if (pollData !== null) {
    messageComponent = <Poll pollData={pollData} />;
  }

  return (
    <S.Item
      $isSystem={isSystem}
      $isActiveUser={isActiveUser}
      $sameAuthorAsPrevious={sameAuthorAsPrevious}
    >
      <S.Bubble $isSystem={isSystem} $isActiveUser={isActiveUser}>
        <S.Index $isSystem={isSystem} $isActiveUser={isActiveUser}>
          {(message.index + 1).toLocaleString('de-CH')}
        </S.Index>
        <S.Wrapper>
          {!isSystem && !sameAuthorAsPrevious && (
            <S.Author color={color}>{message.author}</S.Author>
          )}
          {messageComponent}
        </S.Wrapper>
        {!isSystem && (
          <S.Date dateTime={dateTime}>
            {new Intl.DateTimeFormat('default', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }).format(message.date)}
          </S.Date>
        )}
      </S.Bubble>
    </S.Item>
  );
}

export default Message;
