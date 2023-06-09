import { Injectable } from '@angular/core';
import { StorageService } from '../storageService/storage.service';
import { IMyself } from 'app/models/userModel';
import { OnlineService } from '../onlineService/online.service';
import { ILoginResponse } from 'app/models/backendRequests';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  myself: BehaviorSubject<IMyself | null> = new BehaviorSubject<IMyself | null>(null);

  constructor(
    private storageService: StorageService,
    private onlineService: OnlineService,
  ) { }


  async loginByToken() {
    let token = this.storageService.getAuthToken();
    if (token) {
      console.log("authLogin: " + token);
      try {
        let response = await this.onlineService.loginByToken(token);
        this.completeLogin(response);
        return true;
      }
      catch (e) {

      }
    }
    return false;
  }

  async loginByCreds(username: string, password: string) {
    try {
      let response = await this.onlineService.loginByCreds(username, password);
      console.log(response);
      this.completeLogin(response);
      return true;
    } catch (e) {

    }
    return false;
  }

  async logout(logoutOtherSessions: boolean) {
    try {
      await this.onlineService.logout(this.storageService.getAuthToken(), logoutOtherSessions);
    } catch (e) {
    }
    this.myself.next(null!);
    this.storageService.removeAuthToken();
  }

  async register(username: string, email: string, password: string) {
    if (password.length < 5) return;
    try {
      let response = await this.onlineService.register(username, email, password);
      this.completeLogin(response);
      return true;
    } catch {

    }
    return false;
  }

  async changePassword(oldP: string, newP: string, logoutOther: boolean): Promise<boolean> {
    if (!this.myself.value) return false;
    try {
      await this.onlineService.changePassword(this.myself.value.userId, oldP, newP, logoutOther, this.myself.value.token);
      console.log("return true");
      return true;
    } catch {
    }
    return false;
  }

  async addEmail(email: string) {
    if (!this.myself.value) return;
    await this.onlineService.addEmail(this.myself.value.token, email);
  }

  forgotPassword() {
    let backendLink = this.onlineService.backendLink;
    window.open(`${backendLink}/email/forgotPassword`);
  }

  async deleteUserAccount() {
    await this.onlineService.deleteUser(this.storageService.getAuthToken());
  }

  completeLogin(loginResponse: ILoginResponse) {
    let newMe: IMyself = {
      userId: loginResponse.id,
      token: loginResponse.authToken,
      username: loginResponse.username,
      email: loginResponse.email,
    }
    this.myself.next(newMe);
    this.storageService.saveAuthToken(loginResponse.authToken);
  }
}
