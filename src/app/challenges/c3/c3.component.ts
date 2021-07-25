import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {timeout} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-c3',
  templateUrl: './c3.component.html',
  styleUrls: ['./c3.component.scss']
})
export class C3Component implements OnInit {

  form: FormGroup = new FormGroup({});
  validated = false;
  valid = false;

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        name: new FormControl(''),
        password: new FormControl('')
      }
    )
  }

  validate() {
    const user = {
      name: this.form.controls.name.value,
      password: this.form.controls.password.value
    }

    this.authSrv.authPassword(user).subscribe((valid)=> {
      if(valid) {
        this.sendMessage(true);
        return;
      }
      this.sendMessage(false);
    })

  }

  sendMessage(logged: boolean) {
    let timeout;
    window.clearTimeout(timeout);
    this.validated = true;
    timeout = setTimeout(()=> this.validated = false, 5000);
    if(logged) {
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

}
