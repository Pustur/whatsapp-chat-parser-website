import { atom } from 'jotai';
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
  const file = get(uploadedFileAtom);

  return fileToText(extractFile(file)).then(text =>
    replaceEncryptionMessageAuthor(
      parseStringSync(text, { parseAttachments: file instanceof ArrayBuffer }),
    ),
  );
});

export {
  isMenuOpenAtom,
  activeUserAtom,
  uploadedFileAtom,
  messagesAtom,
  zipFileAtom,
};
