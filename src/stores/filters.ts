import { atom } from 'jotai';

import { DateBounds, FilterMode, ILimits } from '../types';

const DEFAULT_LOWER_LIMIT = 1;
const DEFAULT_UPPER_LIMIT = 100;

const globalFilterModeAtom = atom<FilterMode>('index');

const mergeLimits = (oldLimits: ILimits, newLimits: ILimits): ILimits => ({
  ...oldLimits,
  low: Number.isNaN(newLimits.low) ? DEFAULT_LOWER_LIMIT : newLimits.low,
  high: Number.isNaN(newLimits.high) ? DEFAULT_UPPER_LIMIT : newLimits.high,
});

const tempLimitsAtom = atom<ILimits>({
  low: DEFAULT_LOWER_LIMIT,
  high: DEFAULT_UPPER_LIMIT,
});

const limitsAtom = atom<ILimits, ILimits>(
  get => get(tempLimitsAtom),
  (get, set, limits) =>
    set(tempLimitsAtom, mergeLimits(get(tempLimitsAtom), limits)),
);

const datesAtom = atom<DateBounds>({
  start: new Date(),
  end: new Date(),
});

export { globalFilterModeAtom, limitsAtom, datesAtom };
