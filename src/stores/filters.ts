import { atom } from 'jotai';

const DEFAULT_LOWER_LIMIT = 1;
const DEFAULT_UPPER_LIMIT = 100;

const globalFilterModeAtom = atom('index');

interface ILimits {
  low: number;
  high: number;
}

export interface ILimitsString {
  low: string;
  high: string;
}

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

const datesAtom = atom({
  start: new Date(),
  end: new Date(),
});

export { globalFilterModeAtom, limitsAtom, datesAtom };
