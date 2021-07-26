import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authPassword(toVerify: any): Observable<boolean> {
    // mock
    const userDB = {
      name: "test",
      password: "123"
    }

    return of(userDB).pipe(
      map((usr) => usr.password == toVerify.password
    ));
  }
}
