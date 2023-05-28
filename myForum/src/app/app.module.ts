import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularWebStorageModule } from 'angular-web-storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularWebStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
