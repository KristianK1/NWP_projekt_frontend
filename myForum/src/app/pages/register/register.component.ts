import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/userService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  navigateToLogin(){
    this._router.navigate(['login']);
  }
}
