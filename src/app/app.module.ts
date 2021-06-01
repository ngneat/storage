import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomStorage } from "./custom-storage.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CustomStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
