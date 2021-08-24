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
import { C6Component } from './challenges/c6/c6.component';
import { C7Component } from './challenges/c7/c7.component';
import { C8Component } from './challenges/c8/c8.component';
import { C9Component } from './challenges/c9/c9.component';
import { C10Component } from './challenges/c10/c10.component';
import { C11Component } from './challenges/c11/c11.component';
import { ToastComponent } from './challenges/c11/toast/toast.component';
import { C12Component } from './challenges/c12/c12.component';
import { C13Component } from './challenges/c13/c13.component';
import { C14Component } from './challenges/c14/c14.component';

@NgModule({
  declarations: [
    AppComponent,
    C1Component,
    C2Component,
    C3Component,
    C4Component,
    C5Component,
    C6Component,
    C6Component,
    C7Component,
    C8Component,
    C9Component,
    C10Component,
    C11Component,
    ToastComponent,
    C12Component,
    C13Component,
    C14Component
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
