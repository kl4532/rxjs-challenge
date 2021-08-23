import {Component, ElementRef, OnInit} from '@angular/core';
import {fromEvent} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-c13',
  templateUrl: './c13.component.html',
  styleUrls: ['./c13.component.scss']
})
export class C13Component implements OnInit {
  private scale=1;

  constructor(private el: ElementRef) {}

  get height() {
    return this.scale * 100;
  }
  ngOnInit(): void {
    const banner = <HTMLElement>this.el.nativeElement.querySelector('.banner');
    const scaleContainer = <HTMLElement>this.el.nativeElement.querySelector('.scale-container');

    fromEvent(document, 'scroll').pipe(
      tap(()=>{
        let scale = scaleContainer.getBoundingClientRect().width / scaleContainer.offsetWidth;
        scale = +scale.toFixed(2);
        if(banner.offsetTop > 70) {
          if(scale >= 0.6) {
            scale = scale - 0.05;
            scaleContainer.style.transform = `scale(${scale})`;
          }
        } else {
          if(scale < 1) {
            scale = scale + 0.05;
            scaleContainer.style.transform = `scale(${scale})`;
          }
        }
        this.scale = scale;
      })
    ).subscribe();
  }

}
