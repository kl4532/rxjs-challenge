import {Component, OnDestroy} from '@angular/core';
import {interval, Subject} from "rxjs";
import {map, switchMap, take} from "rxjs/operators";

@Component({
  selector: 'app-c5',
  templateUrl: './c5.component.html',
  styleUrls: ['./c5.component.scss']
})
export class C5Component implements OnDestroy{
  value = 5;
  output = 0;

  constructor() { }

  readonly starter$ = new Subject();
  readonly counter$ = this.starter$.pipe(
   switchMap(() => interval(1000).pipe(
     take(this.value+1),
     map(x => this.value - x)
   ))
  ).subscribe(tick => this.output=tick);

  ngOnDestroy() {
    this.counter$.unsubscribe();
  }
}
