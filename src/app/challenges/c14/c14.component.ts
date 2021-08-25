import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {fromEvent, Observable} from "rxjs";
import {map, switchMap, takeUntil, tap} from "rxjs/operators";

export interface Folder {
  name: string;
  selected: boolean;
}

export interface Coordinates {
  top: number;
  left: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-c14',
  templateUrl: './c14.component.html',
  styleUrls: ['./c14.component.scss']
})

export class C14Component implements OnInit {

  folders: Folder[] = [];
  coordinates$: Observable<Coordinates> | undefined;
  selecting = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    for (let i = 1; i < 13; i++) {
      const folder = {
        name: i.toString(),
        selected: false
      }
      this.folders.push(folder);
    }

    const area = this.el.nativeElement.querySelector('.area');
    const mouseUp$ = fromEvent(area, 'mouseup');
    const mouseDown$ = fromEvent(area, 'mousedown');
    const mouseMove$ = fromEvent(area, 'mousemove');

    this.coordinates$ = mouseDown$.pipe(
      switchMap((start: any) => mouseMove$.pipe(
        takeUntil(mouseUp$.pipe(tap(()=> this.selecting = false))),
        map((end: any) => {
          this.deselectAll();
          this.selecting = true;
          const selection: Coordinates = {
            top: start.layerY,
            left: start.layerX,
            width: end.layerX - start.layerX,
            height: end.layerY - start.layerY
          }
          this.selectFolders(area, selection);
          return selection;
        })
      ))
    );
  }


  selectFolder(element: any) {
    this.folders.map(folder => {
      if (folder.name === element.innerText) {
        folder.selected = true;
        this.renderer.addClass(element, 'active');
      }
    })
  }

  selectFolders(area: HTMLElement, selection: Coordinates) {
    const folders = this.el.nativeElement.querySelectorAll('.folder');
    for(let folder of folders) {
      const folderBCR = folder.getBoundingClientRect();
      const areaBCR = area.getBoundingClientRect();
      const folderCoordinates = {
        top: folderBCR.top - areaBCR.top,
        left: folderBCR.left - areaBCR.left,
        width: folderBCR.width,
        height: folderBCR.height
      }

      const sx1 = selection.left;
      const sx2 = selection.left + selection.width;
      const fx1 = folderCoordinates.left;
      const fx2 = folderCoordinates.left + folderCoordinates.width;

      const sy1 = selection.top;
      const sy2 = selection.top + selection.height;
      const fy1 = folderCoordinates.top;
      const fy2 = folderCoordinates.top + folderCoordinates.height;

      if(
        (sx1 >= fx1 && sx1 <= fx2 || sx1 <= fx1 && sx2 >= fx1) &&
        (sy1 >= fy1 && sy1 <= fy2 || sy1 <= fy1 && sy2 >= fy1)
      ) {
        this.selectFolder(folder);
      }
    }

  }

  deselectAll() {
    this.folders.map(folder => folder.selected = false);
    const folders = this.el.nativeElement.querySelectorAll('.folder');
    for(let folder of folders) {
      this.renderer.removeClass(folder, 'active');
    }
  }
}
