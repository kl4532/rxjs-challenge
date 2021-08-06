import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {map, shareReplay, startWith, tap} from "rxjs/operators";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-c8',
  templateUrl: './c8.component.html',
  styleUrls: ['./c8.component.scss']
})


export class C8Component implements OnDestroy{
  cache: {[key: string]: Observable<string[]>} = {};
  filteredValues: Observable<string[]> | undefined;
  sub: Subscription | undefined;
  constructor() { }

  simulateBacked(event: any): Observable<string[]> {
    console.log('backend called');
    const phrase = (<HTMLInputElement>event.target).value
    const res = ['test1', 'test2', 'test3'].filter(search => search.startsWith(phrase));
    return of(res);
  }

  search(event: any): void{
    const phrase = (<HTMLInputElement>event.target).value as string;
    if(this.cache && this.cache.hasOwnProperty(phrase)) {
      console.log('Returning cached value!');
      this.filteredValues = this.cache[phrase];
    } else {
      this.sub = this.simulateBacked(event).pipe(
        map(result => {
          console.log('backend called, cache:', this.cache);
          this.cache[phrase] = of(result);
          this.filteredValues = this.cache[phrase];
          return result;
        })
      ).subscribe();
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }


}
