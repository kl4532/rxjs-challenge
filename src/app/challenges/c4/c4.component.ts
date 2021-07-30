import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {interval} from "rxjs";
import {map, takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-c4',
  templateUrl: './c4.component.html',
  styleUrls: ['./c4.component.scss']
})
export class C4Component implements OnInit {
  increment = 42;
  btnDisabled = false;
  success = false;

  constructor(private rendered: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
  }

  startIfVisible() {
    this.btnDisabled = true;
    this.success = false;

    const checkInterval = setInterval(()=> {
      const inner = this.el.nativeElement.querySelector('.inner');
      if(inner) {
        this.start();
        clearInterval(checkInterval);
      }
    }, 10)
  }

  start() {
    const inner = this.el.nativeElement.querySelector('.inner');
    const outer = this.el.nativeElement.querySelector('.outer');
    let progress = 0;

    interval(500).pipe(
      map(() => {
        progress += this.increment;
        this.rendered.setStyle(inner, 'width', progress+'px');
        console.log(inner.offsetWidth);
        return inner.offsetWidth >= outer.offsetWidth
      }),
      takeWhile((finished) => {
        if(finished) {
          this.btnDisabled = false;
          this.success = true;
        }
        return !finished
      })
    ).subscribe();
  }

}
