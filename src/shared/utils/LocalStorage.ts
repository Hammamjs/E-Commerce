export const getLocalstorage = (key: string): unknown =>
  JSON.parse(localStorage.getItem(key)!);

export const addToLocalstorage = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromLocalstorage = (key: string): void =>
  localStorage.removeItem(key);

export const checkInLoacalstorage = (key: string): boolean =>
  getLocalstorage(key) !== null;

export const clearLocalstorage = (): void => localStorage.clear();
