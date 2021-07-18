import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {C1Component} from "./challenges/c1/c1.component";
import {C2Component} from "./challenges/c2/c2.component";

const routes: Routes = [
  { path: 'c1', component: C1Component },
  { path: 'c2', component: C2Component },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
