import { atom } from 'jotai';

const isMenuOpenAtom = atom(false);
const activeUserAtom = atom('');
const zipFileAtom = atom(null);

export { isMenuOpenAtom, activeUserAtom, zipFileAtom };
