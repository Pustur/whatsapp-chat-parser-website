class UniqueIdGenerator {
  private cache: Map<string, number>;

  private currentNumber: number;

  constructor() {
    this.cache = new Map();
    this.currentNumber = 0;
  }

  public getId(str: string): number {
    const cachedNumber = this.cache.get(str);

    if (typeof cachedNumber !== 'undefined') return cachedNumber;

    const { currentNumber } = this;
    this.cache.set(str, currentNumber);
    this.currentNumber += 1;
    return currentNumber;
  }
}

export { UniqueIdGenerator };
