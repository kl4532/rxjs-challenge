import {AfterViewInit, Component, ElementRef, Input, OnDestroy} from '@angular/core';
import {C11Component} from "../c11.component";
import {fromEvent, Subscription, timer} from "rxjs";
import {repeatWhen, takeUntil, tap} from "rxjs/operators";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('insert', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class ToastComponent implements AfterViewInit, OnDestroy {

  @Input() message = '';
  parentRef: C11Component | undefined;
  id = 0;
  sub: Subscription | undefined;

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    const toast = this.element.nativeElement.querySelector('.toast')
    const mouseOver$ = fromEvent(toast, 'mouseover');
    const mouseOut$ = fromEvent(toast, 'mouseout');

    this.sub = timer(2000).pipe(
      takeUntil(mouseOver$),
      repeatWhen(() => mouseOut$),
      tap(() => this.delete())
    ).subscribe();
  }

  delete() {
    if(!this.parentRef) {
      return;
    }
    this.parentRef.removeToast(this.id);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
