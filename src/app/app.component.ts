import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ResolveEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {routes} from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rxjs-challenge';
  challenges: string[] = [];
  challengesAmount = routes.length;
  value: string = "c1";
  sub: Subscription | undefined;

  constructor(private router: Router) {}
  ngOnInit() {
    this.sub = this.router.events.subscribe((data)=> {
      if(data instanceof ResolveEnd) {
        const endPath = data.url;
          if(endPath.length>1) {
            this.value = endPath? endPath.split('/')[1] : "c1";
          }
      }
    })

    for(let i = 1; i <= this.challengesAmount; i++) {
      this.challenges.push("Challenge " + i);
    }
  }

  navigateTo(value: any) {
    this.router.navigate([`/${value.value}`]);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
