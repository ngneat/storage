import { Injectable } from "@angular/core";
import { PersistManager } from "@ngneat/storage";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class CustomStorage implements PersistManager {
  private fakeDataStorage = new FakeDataStorage()
  getValue(key: string): Observable<any> {
    return this.fakeDataStorage.getValueFromStorage(key)
  }

  setValue(key: string, value: any): Observable<any> {
    return this.fakeDataStorage.setValueToStorage(key, value)
  }

}

class FakeDataStorage {
  private data: Record<string, any> = {};
  getValueFromStorage(key: string): Observable<any> {
    return of(this.data[key])
  }

  setValueToStorage(key: string, value: any): Observable<any> {
    return of(value).pipe(
      tap(() => {
        this.data[key] = value;
      })
    )
  }
}
