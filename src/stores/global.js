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
const uploadedFileAtom = atom(null);
const zipFileAtom = atom(get => extractFile(get(uploadedFileAtom)));
const messagesAtom = atom(get => {
  const file = get(zipFileAtom);

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
  uploadedFileAtom,
  messagesAtom,
  participantsAtom,
  zipFileAtom,
};
