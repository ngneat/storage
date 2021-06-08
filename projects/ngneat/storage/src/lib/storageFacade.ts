import { Observable } from 'rxjs';
import { first, map, switchMap, take } from 'rxjs/operators';
import { PersistManager } from './persistManager';
import { wrapIntoObservable } from './utils';

export class StorageFacade<T> {
  constructor(private persistManager: PersistManager<T>) {}

  get(key: string): Observable<T> {
    return wrapIntoObservable<T>(this.persistManager.getValue(key)).pipe(
      take(1)
    );
  }

  update(storageKey: string, updateCallback: (valueFromStorage: T) => T): void {
    this.get(storageKey)
      .pipe(
        first(),
        map(updateCallback),
        switchMap((storageValue) =>
          wrapIntoObservable<T>(
            this.persistManager.setValue(storageKey, storageValue)
          )
        )
      )
      .subscribe();
  }
}
