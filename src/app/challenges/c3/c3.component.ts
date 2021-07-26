import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {
  map,
  switchMap,
  tap,
} from "rxjs/operators";
import {of, Subject, Subscription, timer} from "rxjs";


@Component({
  selector: 'app-c3',
  templateUrl: './c3.component.html',
  styleUrls: ['./c3.component.scss']
})
export class C3Component implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({});
  hidden = true;
  sub: Subscription | undefined;
  message = "";

  constructor(private authSrv: AuthService) { }
  readonly submit$ = new Subject<void>();

  ngOnInit(): void {
    this.form = new FormGroup({
        name: new FormControl(''),
        password: new FormControl('')
      }
    )

    this.sub = this.submit$.pipe(
      map(() => {
        return {
          name: this.form.controls.name.value,
          password: this.form.controls.password.value
        }
      }),
      switchMap(user => this.authSrv.authPassword(user).pipe(
        map(isValid => {
          this.hidden = false;
          this.message = isValid ? "Logged in" : "Wrong password";
        }),
      )),
      switchMap(() => timer(1000).pipe(tap(() => this.hidden = true))),
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }


}
