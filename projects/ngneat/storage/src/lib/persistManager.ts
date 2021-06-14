import { Observable } from "rxjs";

export interface PersistManager<T = unknown> {
  getValue(key: string): MaybeAsync<T> ;
  setValue(key: string, value: T): MaybeAsync<T>;
}

export type MaybeAsync<T = unknown> = Promise<T> | Observable<T> | T;
