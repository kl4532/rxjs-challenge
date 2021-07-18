import {Component, ElementRef, OnInit} from '@angular/core';
import {fromEvent} from "rxjs";

@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.scss']
})
export class C1Component implements OnInit {

  focusedElement: HTMLElement | undefined;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const block = this.el.nativeElement.querySelector('.block-to-track');
    const focusObservable = fromEvent(block, 'focusin').subscribe(
      (focus: any) => {
        this.focusedElement = focus.target;
      },
      (err)=>err,
      ()=>console.log('complete'));
  }

}
