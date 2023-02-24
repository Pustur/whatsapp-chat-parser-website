import JSZip from 'jszip';
import { parseString } from 'whatsapp-chat-parser';
import { DateBounds, ExtractedFile, IndexedMessage } from '../types';

const getMimeType = (fileName: string) => {
  if (/\.jpe?g$/.test(fileName)) return 'image/jpeg';
  if (fileName.endsWith('.png')) return 'image/png';
  if (fileName.endsWith('.gif')) return 'image/gif';
  if (fileName.endsWith('.webp')) return 'image/webp';
  if (fileName.endsWith('.svg')) return 'image/svg+xml';

  if (fileName.endsWith('.mp4')) return 'video/mp4';
  if (fileName.endsWith('.webm')) return 'video/webm';

  if (fileName.endsWith('.mp3')) return 'audio/mpeg';
  if (fileName.endsWith('.m4a')) return 'audio/mp4';
  if (fileName.endsWith('.wav')) return 'audio/wav';
  if (fileName.endsWith('.opus')) return 'audio/ogg';

  return null;
};

const showError = (message: string, err?: Error) => {
  console.error(err || message); // eslint-disable-line no-console
  alert(message); // eslint-disable-line no-alert
};

const readChatFile = (zipData: JSZip) => {
  const chatFile = zipData.file('_chat.txt');

  if (chatFile) return chatFile.async('string');

  const chatFiles = zipData.file(/.*(?:chat|whatsapp).*\.txt$/i);

  if (!chatFiles.length) {
    return Promise.reject(new Error('No txt files found in archive'));
  }

  const chatFilesSorted = chatFiles.sort(
    (a, b) => a.name.length - b.name.length,
  );

  return chatFilesSorted[0].async('string');
};

const replaceEncryptionMessageAuthor = (messages: IndexedMessage[]) =>
  messages.map((message, i) => {
    if (i < 10 && message.message.includes('end-to-end')) {
      return { ...message, author: null };
    }
    return message;
  });

const extractFile = (file: FileReader['result']) => {
  if (!file) return null;
  if (typeof file === 'string') return file;

  const jszip = new JSZip();

  return jszip.loadAsync(file);
};

const fileToText = (file: ExtractedFile) => {
  if (!file) return Promise.resolve('');
  if (typeof file === 'string') return Promise.resolve(file);

  return readChatFile(file).catch((err: Error) => {
    // eslint-disable-next-line no-alert
    alert(err);
    return Promise.resolve('');
  });
};

function messagesFromFile(file: ExtractedFile) {
  return fileToText(file).then(text =>
    replaceEncryptionMessageAuthor(
      parseString(text, { parseAttachments: file instanceof JSZip }).map(
        (msg, index) => ({ ...msg, index }),
      ),
    ),
  );
}

function participantsFromMessages(messages: IndexedMessage[]) {
  const set = new Set<string>();

  messages.forEach(m => {
    if (m.author) set.add(m.author);
  });

  return Array.from(set);
}

function getISODateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

function extractStartEndDatesFromMessages(
  messages: IndexedMessage[],
): DateBounds {
  const start = messages[0]?.date ?? new Date();
  const end = messages.at(-1)?.date ?? new Date();

  return { start, end };
}

function filterMessagesByDate(
  messages: IndexedMessage[],
  startDate: Date,
  endDate: Date,
) {
  return messages.filter(
    message => message.date >= startDate && message.date <= endDate,
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
  getMimeType,
  showError,
  readChatFile,
  replaceEncryptionMessageAuthor,
  extractFile,
  fileToText,
  messagesFromFile,
  participantsFromMessages,
  getISODateString,
  extractStartEndDatesFromMessages,
  filterMessagesByDate,
  capitalize,
};
