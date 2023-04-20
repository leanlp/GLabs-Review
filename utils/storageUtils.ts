class StorageUtils {
  static setItemInStorage<T>(key: string, value: T) {
    if (typeof window == undefined) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  static getItemFromStorage<T>(key: string): T | null {
    if (typeof window == undefined) return null;
    const valueInSessionStorage = window.localStorage.getItem(key);
    if (valueInSessionStorage) {
      return JSON.parse(valueInSessionStorage);
    }
    return null;
  }
}

export default StorageUtils;
