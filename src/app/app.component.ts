import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rxjs-challenge';
  challenges: string[] = [];
  challengesAmout = 2;

  constructor(private router: Router) {}
  ngOnInit() {
    for(let i = 1; i <= this.challengesAmout; i++) {
      this.challenges.push("Challenge " + i);
    }
  }

  navigateTo(value: any) {
    this.router.navigate([`/${value.value}`]);
  }

}
