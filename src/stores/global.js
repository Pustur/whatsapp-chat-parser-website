import { atom } from 'jotai';
import JSZip from 'jszip';
import { parseStringSync } from 'whatsapp-chat-parser';

import {
  replaceEncryptionMessageAuthor,
  extractFile,
  fileToText,
} from '../utils/utils';

const isMenuOpenAtom = atom(false);
const activeUserAtom = atom('');
const rawFileAtom = atom(null);
const extractedFileAtom = atom(get => extractFile(get(rawFileAtom)));
const messagesAtom = atom(get => {
  const file = get(extractedFileAtom);

  return fileToText(file).then(text =>
    replaceEncryptionMessageAuthor(
      parseStringSync(text, { parseAttachments: file instanceof JSZip }),
    ),
  );
});
const participantsAtom = atom(get => {
  const messages = get(messagesAtom);
  const set = new Set();

  messages.forEach(m => {
    if (m.author !== 'System') set.add(m.author);
  });

  return Array.from(set);
});

export {
  isMenuOpenAtom,
  activeUserAtom,
  rawFileAtom,
  messagesAtom,
  participantsAtom,
  extractedFileAtom,
};
