import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {C1Component} from "./challenges/c1/c1.component";
import {C2Component} from "./challenges/c2/c2.component";
import {C3Component} from "./challenges/c3/c3.component";
import {C4Component} from "./challenges/c4/c4.component";

export const routes: Routes = [
  { path: 'c1', component: C1Component },
  { path: 'c2', component: C2Component },
  { path: 'c3', component: C3Component },
  { path: 'c4', component: C4Component },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
