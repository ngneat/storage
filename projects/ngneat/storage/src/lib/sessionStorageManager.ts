import { PersistManager } from './persistManager';

export class SessionStorageManager<T> implements PersistManager<T> {
  setValue(key: string, data: T): T {
    sessionStorage.setItem(key, JSON.stringify(data));
    return data;
  }

  getValue(key: string, defaultValue = undefined): T {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return (defaultValue as unknown) as T;
    }
  }
}
