import { withNoXsrfProtection } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(
    private _router: Router,
    private userService: UserService,
  ) { }


  ngOnInit(): void {
    this.loginByToken();
  }

  loginByToken() {
    this.userService.loginByToken();
  }

  loginByCreds() {
    this.userService.loginByCreds(this.username, this.password);
  }

  navigateToRegister(){
    this._router.navigate(['register']);
  }

  forgotPassword(){
    this.userService.forgotPassword();
  }

}
