import { Component } from '@angular/core';
import { CustomStorage } from './custom-storage.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { wrapIntoObservable } from '../../projects/ngneat/storage/src/lib/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private customStorage: CustomStorage) {}

  addToStorage(value: any): void {
    wrapIntoObservable(this.customStorage.setValue('test', value))
      .pipe(first())
      .subscribe();
  }

  getFromStorage(key: any): Observable<any> {
    return this.customStorage.getValue(key);
  }
}
