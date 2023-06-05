import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/userService/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loggedIn = false;

  constructor(
    private _router: Router,
    private userService: UserService,
  ) {
    this.userService.myself.subscribe((value) => {
      this.loggedIn = !!value;
    });

  }

  ngOnInit(): void {
    this.loginByToken()
  }

  async loginByToken() {
    await this.userService.loginByToken();
  }

  navigateToLogin() {
    this._router.navigate(['login']);
  }

  logout() {
    this.userService.logout(false);
  }

  navigateToUserSettings(){
    this._router.navigate(["user"]);
  }

  navigateToAddNewTopic(){
    this._router.navigate(["addTopic"]);
  }

}
