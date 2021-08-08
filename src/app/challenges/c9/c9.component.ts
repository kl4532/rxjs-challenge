import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, empty, from, interval, of, Subject, timer, zip} from "rxjs";
import {concatMap, delay, map, startWith, switchMap, takeWhile, tap, timeout} from "rxjs/operators";

@Component({
  selector: 'app-c9',
  templateUrl: './c9.component.html',
  styleUrls: ['./c9.component.scss']
})
export class C9Component {

  lyrics = ['Maciek ja tylko żartowałem',
  'nigdy ciebie nie kochałem', 'kochałem setki innych facetów',
  'z tobą to jednak nie to.', 'Kręci się ziemia w okół słońca',
  'dostać można szału z gorąca', 'Maciek ja tylko żartowałem',
  'nigdy jeszcze z nikim nie spałem.', 'END'];

  play = new Subject();
  animationTime = new BehaviorSubject(0);

  constructor() { }

  showText = this.play.pipe(
    switchMap(() => from(this.lyrics).pipe(
      startWith('200'),
      concatMap((text, i) => of(this.lyrics).pipe(
          delay(text.length * 100),
          tap(() => this.animationTime.next(text.length * 100)),
          tap(() => console.log(text.length * 10)),
          takeWhile(val => val[i] != "END", true),
          map(val => val[i])
        )
      )
    ))
  )

}
