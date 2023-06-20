import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/userService/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    private _router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  async logout() {
    await this.userService.logout(false);
    this._router.navigate([""]);
  }

  async logoutAllSessions() {
    await this.userService.logout(true);
    this._router.navigate([""]);
  }

  chPass() {
    this._router.navigate(["chPass"]);
  }

  async deleteUserAccount() {
    await this.userService.deleteUserAccount();
  }

}
