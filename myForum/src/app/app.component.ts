import { Component } from '@angular/core';
import { UserService } from './services/userService/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myForum';
  constructor(private userService: UserService){
    this.userService.loginByToken();
  }
}
