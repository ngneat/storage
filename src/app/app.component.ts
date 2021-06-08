import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageManager, StorageFacade } from "@ngneat/storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private storageFacade = new StorageFacade<string>(new LocalStorageManager<string>())

  addToStorage(value: string): void {
    const updateCallback = (storageValue: string) => {
      storageValue = value
      return storageValue
    }
    this.storageFacade.update('test', updateCallback)
  }

  getFromStorage(key: string): Observable<string> {
    return this.storageFacade.get(key)
  }
}
