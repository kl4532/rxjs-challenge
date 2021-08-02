import {Component} from '@angular/core';
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map, pairwise, throttleTime} from "rxjs/operators";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-c7',
  templateUrl: './c7.component.html',
  styleUrls: ['./c7.component.scss'],
  animations: [
    trigger('triggerShow', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class C7Component{
  hidden$ = fromEvent(window, 'scroll').pipe(
    map(()=> document.body.getBoundingClientRect().top),
    pairwise(),
    map(([prev, next])=> prev > next),
    distinctUntilChanged()
  )
  constructor() {}
}
