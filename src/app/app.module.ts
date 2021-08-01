import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { C1Component } from './challenges/c1/c1.component';
import { C2Component } from './challenges/c2/c2.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { C3Component } from './challenges/c3/c3.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { C4Component } from './challenges/c4/c4.component';
import { C5Component } from './challenges/c5/c5.component';

@NgModule({
  declarations: [
    AppComponent,
    C1Component,
    C2Component,
    C3Component,
    C4Component,
    C5Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
