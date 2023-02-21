import { atom } from 'jotai';

const DEFAULT_LOWER_LIMIT = 1;
const DEFAULT_UPPER_LIMIT = 100;

const globalFilterModeAtom = atom('index');

interface ILimits {
  low: number;
  high: number;
}

const setLimits = (
  limits: ILimits,
  { low, high }: { low: string; high: string },
) => {
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

const limitsAtom = atom<{ low: number; high: number }>(
  {
    low: DEFAULT_LOWER_LIMIT,
    high: DEFAULT_UPPER_LIMIT,
  },
  (get, set, limits) => set(limitsAtom, setLimits(get(limitsAtom), limits)),
);

const datesAtom = atom({
  start: new Date(),
  end: new Date(),
});

export { globalFilterModeAtom, limitsAtom, datesAtom };
