import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {fromEvent, merge, Observable, Subject, Subscription} from "rxjs";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-c15',
  templateUrl: './c15.component.html',
  styleUrls: ['./c15.component.scss']
})
export class C15Component implements OnInit, OnDestroy {

  focusWithScript = new Subject;
  focusTypes = ['blur', 'focus-mouse', 'focus-script', 'focus-keyboard'];
  sub: Subscription | undefined;
  focusedElement: Observable<any> | undefined;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    const btnTarget = this.el.nativeElement.querySelector('.btn-target') as HTMLElement;

    this.focusedElement = fromEvent(document, 'focusin').pipe(map((e: any) => e.target?.tagName));

    const onKeyboard = fromEvent(btnTarget, 'focusin').pipe(
      tap(()=> {
        if(btnTarget.matches(':focus-visible')) {
          this.activateClass('focus-keyboard', btnTarget, 'Keyboard');
        }
      })
    )

    const onBlur = fromEvent(btnTarget, 'focusout').pipe(
      tap(()=> this.activateClass('blur', btnTarget, 'Blur'))
    )
    const onClick = fromEvent(btnTarget, 'click').pipe(
      tap(()=> this.activateClass('focus-mouse', btnTarget, 'Clicked'))
    )
    const withScript = this.focusWithScript.pipe(
      tap(()=> this.activateClass('focus-script', btnTarget, 'Script')),
      // tap(()=> btnTarget.focus())
    )

    this.sub = merge(onKeyboard, onBlur, onClick, withScript).subscribe()
  }

  activateClass(active: string, target: HTMLElement, message: string) {
    for(let type of this.focusTypes) {
      this.renderer.removeClass(target, type);
    }
    this.renderer.setProperty(target, 'innerText', message);
    this.renderer.addClass(target, active);
    console.log('focus on', target);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }


}
