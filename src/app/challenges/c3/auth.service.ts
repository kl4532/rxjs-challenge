import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // mock
  topSecret = {
    name: "james",
    password: "007"
  }

  constructor() { }

  authPassword(toVerify: any): Observable<boolean> {
    return of(this.topSecret).pipe(
      map((usr) => usr.password == toVerify.password
    ));
  }
}
