import { atom } from 'jotai';

import {
  extractFile,
  messagesFromFile,
  participantsFromMessages,
} from '../utils/utils';

const isMenuOpenAtom = atom(false);
const activeUserAtom = atom('');
const rawFileAtom = atom(null);
const extractedFileAtom = atom(get => extractFile(get(rawFileAtom)));
const messagesAtom = atom(get => messagesFromFile(get(extractedFileAtom)));
const participantsAtom = atom(get =>
  participantsFromMessages(get(messagesAtom)),
);

export {
  isMenuOpenAtom,
  activeUserAtom,
  rawFileAtom,
  messagesAtom,
  participantsAtom,
  extractedFileAtom,
};
