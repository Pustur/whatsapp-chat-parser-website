import { atom } from 'jotai';
import { createValidDateInputString } from '../utils/utils';
import { messagesAtom } from './global';

const DEFAULT_LOWER_LIMIT = 1;
const DEFAULT_UPPER_LIMIT = 100;

const setLimits = (limits, { low, high }) => {
  return {
    ...limits,
    low:
      low === ''
        ? DEFAULT_LOWER_LIMIT
        : parseInt(low, 10) || DEFAULT_LOWER_LIMIT,
    high:
      high === ''
        ? DEFAULT_UPPER_LIMIT
        : parseInt(high, 10) || DEFAULT_UPPER_LIMIT,
  };
};

const limitsAtom = atom(
  {
    low: DEFAULT_LOWER_LIMIT,
    high: DEFAULT_UPPER_LIMIT,
  },
  (get, set, limits) => {
    set(limitsAtom, setLimits(get(limitsAtom), limits));
  },
);

const datesAtom = atom(get => {
  const messages = get(messagesAtom);

  if (messages.length === 0) {
    return {
      start: 'yyyy-mm-dd',
      end: 'yyyy-mm-dd',
    };
  }

  const start = createValidDateInputString(new Date(messages[0].date));
  const end = createValidDateInputString(new Date(messages.at(-1).date));

  console.log({ start, end });

  return {
    start,
    end,
  };
});

export { limitsAtom, datesAtom };
