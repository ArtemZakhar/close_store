const get = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;

  try {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.log('Could not get property from local storage: ', error);

    return null;
  }
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

export default { get, set, remove };
