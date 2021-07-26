import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "./auth.service";

import {
  delay,
  map,
  switchMap,
  tap,
} from "rxjs/operators";
import {Subject, Subscription, timer} from "rxjs";
import {Animations} from "./animations";


@Component({
  selector: 'app-c3',
  templateUrl: './c3.component.html',
  styleUrls: ['./c3.component.scss'],
  animations: Animations,
})
export class C3Component implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({});
  hidden = true;
  sub: Subscription | undefined;
  message = "";
  disabled = false;
  logged = false;
  hintVisible = false;

  constructor(private authSrv: AuthService) { }
  readonly submit$ = new Subject<void>();

  ngOnInit(): void {
    this.form = new FormGroup({
        name: new FormControl(''),
        password: new FormControl('')
      }
    )

    this.sub = this.submit$.pipe(
      tap(() => this.disabled = true),
      delay(500),
      map(() => {
        this.disabled = false;
        return {
          name: this.form.controls.name.value,
          password: this.form.controls.password.value
        }
      }),
      switchMap(user => this.authSrv.authPassword(user).pipe(
        map(isValid => {
          this.hidden = false;
          this.message = "Wrong password";
          this.logged = isValid;
        }),
      )),
      switchMap(() => timer(1000).pipe(tap(() => this.hidden = true))),
    ).subscribe();
  }
  getName(): string {
    return this.authSrv.topSecret.name;
  }
  getPassword(): string {
    return this.authSrv.topSecret.password;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }


}
