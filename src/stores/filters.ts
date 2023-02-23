import { atom } from 'jotai';

import { DateBounds, FilterMode, ILimits, ILimitsString } from '../types';

const DEFAULT_LOWER_LIMIT = 1;
const DEFAULT_UPPER_LIMIT = 100;

const globalFilterModeAtom = atom<FilterMode>('index');

const setLimits = (limits: ILimits, { low, high }: ILimitsString) => {
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

const tempLimitsAtom = atom<ILimits>({
  low: DEFAULT_LOWER_LIMIT,
  high: DEFAULT_UPPER_LIMIT,
});

const limitsAtom = atom<ILimits, ILimitsString>(
  get => get(tempLimitsAtom),
  (get, set, limits) =>
    set(tempLimitsAtom, setLimits(get(tempLimitsAtom), limits)),
);

const datesAtom = atom<DateBounds>({
  start: new Date(),
  end: new Date(),
});

export { globalFilterModeAtom, limitsAtom, datesAtom };
