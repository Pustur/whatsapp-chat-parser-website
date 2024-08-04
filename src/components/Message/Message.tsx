import React, { Suspense } from 'react';
import Linkify from 'react-linkify';

import Attachment from '../Attachment/Attachment';
import * as S from './style';
import { IndexedMessage } from '../../types';

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

function markdownToHtml(text: string): string {
  // Convert bold text (e.g., *bold*)
  text = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');

  // Convert italic text (e.g., _italic_)
  text = text.replace(/_(.*?)_/g, '<em>$1</em>');

  // Convert headers (e.g., # Header)
  text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Convert links (e.g., [title](http://example.com))
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert unordered lists (e.g., * item)
  text = text.replace(/^\* (.*)$/gm, '<ul><li>$1</li></ul>');
  text = text.replace(/<\/ul>\n<ul>/g, ''); // Fix consecutive <ul> tags

  // Convert ordered lists (e.g., 1. item)
  text = text.replace(/^\d+\. (.*)$/gm, '<ol><li>$1</li></ol>');
  text = text.replace(/<\/ol>\n<ol>/g, ''); // Fix consecutive <ol> tags

  // Convert code blocks (e.g., `code`)
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Convert line breaks to <br> tags
  text = text.replace(/\n/g, '<br>');

  return text;
}

function Message({
  message,
  color,
  isActiveUser,
  sameAuthorAsPrevious,
}: IMessage) {
  const isSystem = !message.author;
  const dateTime = message.date.toISOString().slice(0, 19).replace('T', ' ');

  // Convert markdown message to HTML
  const messageHtml = markdownToHtml(message.message);

  return (
    <S.Item
      isSystem={isSystem}
      isActiveUser={isActiveUser}
      sameAuthorAsPrevious={sameAuthorAsPrevious}
    >
      <S.Bubble isSystem={isSystem} isActiveUser={isActiveUser}>
        <S.Index isSystem={isSystem} isActiveUser={isActiveUser}>
          {(message.index + 1).toLocaleString('de-CH')}
        </S.Index>
        <S.Wrapper>
          {!isSystem && !sameAuthorAsPrevious && (
            <S.Author color={color}>{message.author}</S.Author>
          )}
          {message.attachment ? (
            <Suspense fallback={`Loading ${message.attachment.fileName}...`}>
              <Attachment fileName={message.attachment.fileName} />
            </Suspense>
          ) : (
            <Linkify componentDecorator={Link}>
              {/* Render the HTML safely */}
              <S.Message dangerouslySetInnerHTML={{ __html: messageHtml }} />
            </Linkify>
          )}
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
