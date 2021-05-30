import { from, isObservable, Observable, of } from "rxjs";
import { PersistManager } from "@ngneat/storage";
import { first, take } from "rxjs/operators";
import { MaybeAsync } from "./persistManager";

export function isPromise(value: any): value is Promise<unknown> {
  return typeof value?.then === "function";
}

export function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
  if (isObservable(value) || isPromise(value)) {
    return from(value);
  }

  return of(value);
}

export function getFromStorage<T = any>(key: string, persistManager: PersistManager<T>): T | MaybeAsync<T> {
  return wrapIntoObservable(persistManager.getValue(key)).pipe(take(1));
}

export function updateStorage(key: string, persistManager: PersistManager, value: any): void {
  getFromStorage(key, persistManager).pipe(first()).subscribe((valueFromStorage: any) => {
    const storageValue = valueFromStorage;
    storageValue[key] = value;
    wrapIntoObservable(persistManager.setValue(key, storageValue)).pipe(first()).subscribe();
  });
}

export function removeFromStorage(persistManager: PersistManager, key: string, value: any) {
  wrapIntoObservable(persistManager.setValue(
    key,
    value
  )).pipe(first()).subscribe();
}
