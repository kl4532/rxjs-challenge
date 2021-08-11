import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {BehaviorSubject, empty, from, interval, merge, of, Subject, timer, zip} from "rxjs";
import {concatMap, delay, map, share, shareReplay, startWith, switchMap, takeWhile, tap, timeout} from "rxjs/operators";

@Component({
  selector: 'app-c9',
  templateUrl: './c9.component.html',
  styleUrls: ['./c9.component.scss']
})
export class C9Component implements AfterViewInit{

  lyrics = [
    'Maciek ja tylko żartowałem',
  'nigdy ciebie nie kochałem', 'kochałem setki innych facetów',
  'z tobą to jednak nie to.', 'Kręci się ziemia wokół słońca',
  'dostać można szału z gorąca', 'Maciek ja tylko żartowałem',
  'nigdy jeszcze z nikim nie spałem.', '_END_'
  ];

  play$ = new Subject();
  container: Element | null | undefined;
  animationTrigger$ = new BehaviorSubject({time: 0, text: ''});
  speed = {
    min: 50,
    max: 200,
    val: 80
  }

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const container = document.querySelector('.karaoke-screen')
    this.container = container || null;

    this.animationTrigger$.subscribe((val)=>{
      if(val.time !== 0) {
        this.setText(val.text);
        this.playText(val.time);
      }
    })
  }

  runKaraoke$ = this.play$.pipe(
    switchMap(() => from(this.lyrics).pipe(
      startWith(''),
      concatMap((text, i) => of(this.lyrics).pipe(
        tap(() => this.animationTrigger$.next({time: (text.length * this.speed.val/1.5), text: text})),
        delay(text.length * this.speed.val),
          takeWhile(val => val[i] != "_END_", true),
          map(val => val[i]),
        ),
      ),
    )),
    share()
  )

  setText(text: string) {
    if (!this.container)
      return;
    this.renderer.setProperty(this.container, 'innerHTML', '')
    const textArray = text.split(' ');
    for(let word of textArray) {
      const p = document.createElement('span');
      p.textContent = word + ' ';
      this.renderer.appendChild(this.container, p);
    }
  }

  playText(timespan: number) {
    if (!this.container)
      return;

    const timePerWord = timespan/this.container.children.length;
    let i = 0;

    const children = this.container.children;
    const colorWords = setInterval(() => {
      if(children.length > i
        && (<HTMLElement>children[i])?.style.color !== 'red'
        && children[i].textContent !== '_END_ ') {
        this.renderer.setStyle(children[i] , 'color', 'yellow');
        i++;
      } else {
        clearInterval(colorWords);
      }
    }, timePerWord)
  }

}
