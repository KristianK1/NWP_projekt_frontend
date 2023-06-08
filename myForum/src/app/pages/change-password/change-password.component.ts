import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/userService/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  constructor(
    private userService: UserService,
    private _router: Router,
  ){}

  oldPassword = "";
  newPassword = "";
  newPasswordAgain = "";
  logoutOthers = false;

  async changePassword(){
    if(this.newPassword === this.newPasswordAgain){
      let rez = await this.userService.changePassword(this.oldPassword, this.newPassword, this.logoutOthers)
      console.log(rez);
      if(rez){
        this._router.navigate(["user"]);
      }
    }
  }
}
