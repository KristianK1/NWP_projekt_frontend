import { Injectable } from '@angular/core';
import { StorageService } from '../storageService/storage.service';
import { IMyself } from 'app/models/userModel';
import { OnlineService } from '../onlineService/online.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  myself: IMyself | undefined;

  constructor(
    private storageService: StorageService,
    private onlineService: OnlineService,
  ) { }


  async loginByToken() {
    let token = this.storageService.getAuthToken();
    await this.onlineService.loginByToken(token);
  }

  async loginByCreds(username: string, password: string) {
    await this.onlineService.loginByCreds(username, password);
  }

  async logout(logoutOtherSessions: boolean) {
    await this.onlineService.logout(this.storageService.getAuthToken(), logoutOtherSessions);
  }

  async register(username: string, email: string, password: string) {
    await this.onlineService.register(username, email, password);
  }

  async changePassword(oldP: string, newP: string, logoutOther: boolean) {
    if (!this.myself) return;
    await this.onlineService.changePassword(this.myself.userId, oldP, newP, logoutOther, this.myself.token);
  }

  async addEmail(email: string) {
    if (!this.myself) return;
    await this.onlineService.addEmail(this.myself.token, email);
  }

}
