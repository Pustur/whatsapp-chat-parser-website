import { atom } from 'jotai';

import {
  extractFile,
  extractStartEndDatesFromMessages,
  messagesFromFile,
  participantsFromMessages,
} from '../utils/utils';

const isMenuOpenAtom = atom(false);
const activeUserAtom = atom('');
const rawFileAtom = atom<FileReader['result']>(null);
const extractedFileAtom = atom(get => extractFile(get(rawFileAtom)));
const messagesAtom = atom(get => messagesFromFile(get(extractedFileAtom)));
const participantsAtom = atom(get =>
  participantsFromMessages(get(messagesAtom)),
);

const messagesDateBoundsAtom = atom(get =>
  extractStartEndDatesFromMessages(get(messagesAtom)),
);

export {
  isMenuOpenAtom,
  activeUserAtom,
  rawFileAtom,
  messagesAtom,
  participantsAtom,
  extractedFileAtom,
  messagesDateBoundsAtom,
};
