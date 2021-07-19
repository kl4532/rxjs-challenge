import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.scss']
})
export class C1Component implements OnInit, OnDestroy {

  focusedElement: HTMLElement | undefined;
  focusSub: Subscription | undefined;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const block = this.el.nativeElement.querySelector('.block-to-track');
    this.focusSub = fromEvent(block, 'focusin').subscribe(
      (focus: any) => {
        this.focusedElement = focus.target.tagName;
      },
      (err)=>err,
      ()=>console.log('complete'));
  }

  ngOnDestroy() {
    this.focusSub?.unsubscribe();
  }

}
