import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

export interface Folder {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-c14',
  templateUrl: './c14.component.html',
  styleUrls: ['./c14.component.scss']
})

export class C14Component implements OnInit {

  folders: Folder[] = [];

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
  }

  selectFolder(event: any) {
    const element = event.target;
    this.folders.map(folder => {
      if (folder.name === element.innerText) {
        folder.selected = true;
        this.renderer.addClass(element, 'active');
      }
    })
  }

  deselectAll() {
    this.folders.map(folder => folder.selected = false);
    const folders = this.el.nativeElement.querySelectorAll('.folder');
    for(let folder of folders) {
      this.renderer.removeClass(folder, 'active');
    }
  }

}
