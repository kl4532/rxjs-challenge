import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Renderer2, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-c16',
  templateUrl: './c16.component.html',
  styleUrls: ['./c16.component.scss']
})
export class C16Component implements OnInit, AfterViewInit {
  @ViewChild('img') img: ElementRef | undefined;
  zoom$ = new BehaviorSubject<string>('');
  zoomMin = 0.5;
  zoomMax = 1;
  zoomVal = this.zoomMin;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    console.log(this.img)
  }

  ngOnInit(): void {
    this.zoom$.pipe(
      tap((val: string) => {
        console.log('val is', val);
        this.zoomStep(val);
      })
    ).subscribe()
  }

  zoomStep(action: string) {
    if(action === '+' && this.zoomVal < this.zoomMax) {
      this.zoomVal = this.zoomVal + 0.01;
      this.renderer.setStyle(this.img?.nativeElement, 'transform',`translate(-50%, -50%) scale(${this.zoomVal}, ${this.zoomVal})`)
    }
    if(action === '-' && this.zoomVal > this.zoomMin) {
      this.zoomVal = this.zoomVal - 0.01;
      this.renderer.setStyle(this.img?.nativeElement, 'transform',`translate(-50%, -50%) scale(${this.zoomVal}, ${this.zoomVal})`)
    }
  }
}
