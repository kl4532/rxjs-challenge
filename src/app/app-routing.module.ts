import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {C1Component} from "./challenges/c1/c1.component";
import {C2Component} from "./challenges/c2/c2.component";
import {C3Component} from "./challenges/c3/c3.component";
import {C4Component} from "./challenges/c4/c4.component";
import {C5Component} from "./challenges/c5/c5.component";
import {C6Component} from "./challenges/c6/c6.component";
import {C7Component} from "./challenges/c7/c7.component";
import {C8Component} from "./challenges/c8/c8.component";
import {C9Component} from "./challenges/c9/c9.component";
import {C10Component} from "./challenges/c10/c10.component";
import {C11Component} from "./challenges/c11/c11.component";
import {C12Component} from "./challenges/c12/c12.component";

export const routes: Routes = [
  { path: 'c1', component: C1Component },
  { path: 'c2', component: C2Component },
  { path: 'c3', component: C3Component },
  { path: 'c4', component: C4Component },
  { path: 'c5', component: C5Component },
  { path: 'c6', component: C6Component },
  { path: 'c7', component: C7Component },
  { path: 'c8', component: C8Component },
  { path: 'c9', component: C9Component },
  { path: 'c10', component: C10Component },
  { path: 'c11', component: C11Component },
  { path: 'c12', component: C12Component },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
