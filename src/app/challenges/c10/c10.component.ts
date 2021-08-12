import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {combineLatest, fromEvent, merge, Observable, Subscription} from "rxjs";
import {map, switchMap, takeUntil, takeWhile, tap, withLatestFrom} from "rxjs/operators";

@Component({
  selector: 'app-c10',
  templateUrl: './c10.component.html',
  styleUrls: ['./c10.component.scss']
})
export class C10Component implements AfterViewInit {

  // @ts-ignore
  @ViewChild('canvas') canvas: ElementRef;
  color$: Observable<any> | undefined;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.setCanvas('red');

    const mousedown$ = fromEvent(this.canvas.nativeElement, 'mousedown');
    const mousemove$ = fromEvent(this.canvas.nativeElement, 'mousemove');
    const mouseup$ = fromEvent(this.canvas.nativeElement, 'mouseup');

    const pointer = document.querySelector('.target') as HTMLElement;

    this.color$ = mousedown$.pipe(
      map((event) => {
        this.setPosition(event as MouseEvent, pointer);
        return event;
      }),
      switchMap(() => mousemove$.pipe(
        tap((event) => {
          this.setPosition(event as MouseEvent, pointer);
        }),
        takeUntil(mouseup$),
      )),
      map(event => {
        const e = <MouseEvent>event;
        const data = this.canvas.nativeElement.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data;
        return {
          rgba: this.getRGBA(data),
          hex: this.getHex(data[0], data[1], data[2])
        }
      })
    )
  }

  setPosition(event: MouseEvent, element: HTMLElement) {
    this.renderer.setStyle(element, 'top', event.y -6 + 'px');
    this.renderer.setStyle(element, 'left', event.x -6 + 'px');
  }

  setCanvas(color: string) {
    console.log(this.canvas);
    const canvas = this.canvas.nativeElement;
    canvas.width  = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0,0, 180,200);

    // Add three color stops
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(0.3, color);
    gradient.addColorStop(1, 'white');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);
  }

  getRGBA(data: any) {
    return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  }

  getHex(r: any, g: any,b: any) {
      r = r.toString(16);
      g = g.toString(16);
      b = b.toString(16);

      if (r.length == 1)
        r = "0" + r;
      if (g.length == 1)
        g = "0" + g;
      if (b.length == 1)
        b = "0" + b;

      return "#" + r + g + b;
  }

}
