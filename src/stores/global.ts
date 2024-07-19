import { atom } from 'jotai';

import {
  extractFile,
  extractStartEndDatesFromMessages,
  messagesFromFile,
  participantsFromMessages,
} from '../utils/utils';

const isMenuOpenAtom = atom(false);
const activeUserAtom = atom('');
const isAnonymousAtom = atom(false);
const rawFileAtom = atom<FileReader['result']>(null);
const extractedFileAtom = atom(get => extractFile(get(rawFileAtom)));
const messagesAtom = atom(get =>
  messagesFromFile(get(extractedFileAtom), get(isAnonymousAtom)),
);
const participantsAtom = atom(get =>
  participantsFromMessages(get(messagesAtom)),
);

const messagesDateBoundsAtom = atom(get =>
  extractStartEndDatesFromMessages(get(messagesAtom)),
);

export {
  isMenuOpenAtom,
  activeUserAtom,
  isAnonymousAtom,
  rawFileAtom,
  messagesAtom,
  participantsAtom,
  extractedFileAtom,
  messagesDateBoundsAtom,
};
