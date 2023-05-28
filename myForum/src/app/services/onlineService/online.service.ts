import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddEmailRequest, IChangePasswordRequest, IDeleteUserRequest, ILoginByTokenRequest, ILoginRequest, ILogoutRequest, IRegisterRequest } from 'app/models/backendRequests';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {
  backendLink = "localhost:8001";
  mainAPIrouter = "/API";
  userAuthRouter = "/userAuth";

  constructor(
    private https: HttpClient,
  ) { }

  async loginByToken(token: string) {
    let link = `${this.backendLink}${this.mainAPIrouter}${this.userAuthRouter}/login/token`;
    let body: ILoginByTokenRequest = {
      authToken: token
    }
    let result = await this.https.post(link, body).toPromise();
  }

  async loginByCreds(username: string, password: string) {
    let link = `${this.backendLink}${this.mainAPIrouter}${this.userAuthRouter}/login/creds`;
    let body: ILoginRequest = {
      username: username,
      password: password,
    }
    let result = await this.https.post(link, body).toPromise();
  }

  async logout(token: string, allSessions: boolean) {
    let link = `${this.backendLink}${this.mainAPIrouter}${this.userAuthRouter}/logout`;
    let body: ILogoutRequest = {
      authToken: token,
      logoutOtherSessions: allSessions
    }
    let result = await this.https.post(link, body).toPromise();
  }

  async register(username: string, email: string, password: string) {
    let link = `${this.backendLink}${this.mainAPIrouter}${this.userAuthRouter}/register`;
    let body: IRegisterRequest = {
      username: username,
      password: password,
      email: email,
    }
    let result = await this.https.post(link, body).toPromise();
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string, logoutOther: boolean, dontlogoutToken: string) {
    let link = `${this.backendLink}${this.mainAPIrouter}${this.userAuthRouter}/changePassword`;
    let body: IChangePasswordRequest = {
      userId: userId,
      oldPassword: oldPassword,
      newPassword: newPassword,
      logoutOtherSessions: logoutOther,
      dontLogoutToken: dontlogoutToken,
    }
    let result = await this.https.post(link, body).toPromise();
  }

  async deleteUser(token: string) {
    let link = `${this.backendLink}${this.mainAPIrouter}${this.userAuthRouter}/delete`;
    let body: IDeleteUserRequest = {
      authToken: token,
    }
    let result = await this.https.post(link, body).toPromise();
  }

  async addEmail(token: string, email: string){
    let link = `${this.backendLink}${this.mainAPIrouter}${this.userAuthRouter}/addEmail`;
    let body: IAddEmailRequest = {
      authToken: token,
      email: email,
    }
    let result = await this.https.post(link, body).toPromise();
  }
}
