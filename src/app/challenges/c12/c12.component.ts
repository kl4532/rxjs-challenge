import {Component, OnInit, Renderer2} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {delay, map} from "rxjs/operators";

@Component({
  selector: 'app-c12',
  templateUrl: './c12.component.html',
  styleUrls: ['./c12.component.scss']
})
export class C12Component implements OnInit {

  hidden: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  message = 'Close me with Esc';
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.hidden.pipe(
      map(hidden => {
        const controls = Array.from(document.querySelectorAll( 'select, input, button:not(.overlay)'));
        for(let c of controls) {
            if(hidden) {
              this.renderer.setAttribute(c, 'tabindex', '-1');
            } else {
              this.renderer.setAttribute(c, 'tabindex', '0');
            }
        }
        return hidden;
      }),
      delay(200),
      map(hidden => {
        if(hidden) {
          const dialogBtn = <HTMLElement>document.querySelector( '.dialog > button');
          dialogBtn?.focus();
        }
      }),
    ).subscribe();
  }

}
