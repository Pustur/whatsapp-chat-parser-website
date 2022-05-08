import { atom } from 'jotai';

const isMenuOpenAtom = atom(false);
const activeUserAtom = atom('');

export { isMenuOpenAtom, activeUserAtom };
