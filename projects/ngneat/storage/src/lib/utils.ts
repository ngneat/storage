import { from, isObservable, Observable, of } from 'rxjs';

export function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
  return value instanceof Object && 'then' in value && typeof value.then === 'function';
}

export function wrapIntoObservable<T>(
  value: T | Promise<T> | Observable<T>
): Observable<T> {
  if (isObservable(value) || isPromise(value)) {
    return from(value);
  }

  return of(value);
}
