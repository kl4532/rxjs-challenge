import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authPassword(toVerify: any): Observable<boolean> {
    const userDB = {
      name: "test",
      password: "123"
    }

    return of(userDB).pipe(map((usr) =>{
      if(usr.password !== toVerify.password) {
        return false;
      }
      return true;
    }));
  }
}
