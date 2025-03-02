const getParsedData = <T>(key: string): T | null => {
  try {
    const item = get(key);

    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.log('Could not get property from local storage: ', error);

    return null;
  }
};

const get = (key: string) => {
  if (typeof window === 'undefined') return null;

  return localStorage.getItem(key);
};

const set = (key: string, value: any): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Failed to set property at local storage: ', error);
  }
};

const remove = (key: string) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log('Failed to remove data from local storage: ', error);
  }
};

export default { getParsedData, set, remove, get };
