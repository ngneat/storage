import { PersistManager } from './persistManager';

export class LocalStorageManager<T> implements PersistManager<T> {
  setValue(key: string, data: T): T {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }

  getValue(key: string, defaultValue = undefined): T{
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return (defaultValue as unknown) as T;
    }
  }
}
