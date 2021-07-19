import { Component, OnInit } from '@angular/core';
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-c2',
  templateUrl: './c2.component.html',
  styleUrls: ['./c2.component.scss']
})
export class C2Component implements OnInit {

  actions: string[] = []
  sub: Subscription | undefined;
  constructor() { }

  ngOnInit(): void {
    this.sub = fromEvent(document, 'visibilitychange').subscribe((event) => {
      const timestamp = new Date().toString().split(' ')[4];
      if(document.visibilityState === "visible") {
        this.actions.push('Visible from ' + timestamp);
      } else {
        this.actions.push('Hidden from ' + timestamp);
      }
    })
  }

}
