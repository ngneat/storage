import { from, isObservable, Observable, of } from "rxjs";
import { PersistManager } from "@ngneat/storage";
import { first, take } from "rxjs/operators";

export function isPromise(value: any): value is Promise<unknown> {
  return typeof value?.then === "function";
}

export function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
  if (isObservable(value) || isPromise(value)) {
    return from(value);
  }

  return of(value);
}

export function getFromStorage<T = any>(key: string, persistManager: PersistManager<T>): Observable<T> {
  return wrapIntoObservable(persistManager.getValue(key)).pipe(take(1));
}

export function updateStorage<T = any>(key: string, persistManager: PersistManager<T>, value: any): void {
  getFromStorage<T>(key, persistManager).pipe(first()).subscribe((valueFromStorage: any) => {
    const storageValue = valueFromStorage;
    storageValue[key] = value;
    wrapIntoObservable(persistManager.setValue(key, storageValue)).pipe(first()).subscribe();
  });
}

export function removeFromStorage<T = any>(persistManager: PersistManager<T>, key: string, value: T) {
  wrapIntoObservable(persistManager.setValue(
    key,
    value
  )).pipe(first()).subscribe();
}
