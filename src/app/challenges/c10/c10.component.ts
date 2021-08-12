import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {combineLatest, fromEvent, merge, Observable, Subscription} from "rxjs";
import {switchMap, takeUntil, takeWhile, tap, withLatestFrom} from "rxjs/operators";

@Component({
  selector: 'app-c10',
  templateUrl: './c10.component.html',
  styleUrls: ['./c10.component.scss']
})
export class C10Component implements AfterViewInit {

  // @ts-ignore
  @ViewChild('area') area: ElementRef;
  sub: Subscription | undefined;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    console.log(this.area);
    const mousedown$ = fromEvent(this.area.nativeElement, 'mousedown');
    const mousemove$ = fromEvent(this.area.nativeElement, 'mousemove');
    const mouseup$ = fromEvent(this.area.nativeElement, 'mouseup');

    const pointer = this.area.nativeElement.querySelector('.target') as HTMLElement;

    const observeMouse = mousedown$.pipe(
      tap((event) => {
        console.log(event);
        console.log(pointer);
        this.setPosition(event as MouseEvent, pointer);
      }),
      switchMap(() => mousemove$.pipe(
        tap((event) => {
          this.setPosition(event as MouseEvent, pointer);
        }),
        takeUntil(mouseup$),
      ))
    ).subscribe()
  }

  setPosition(event: MouseEvent, element: HTMLElement) {
    this.renderer.setStyle(element, 'top', event.y -6 + 'px');
    this.renderer.setStyle(element, 'left', event.x -6 + 'px');
  }

}
