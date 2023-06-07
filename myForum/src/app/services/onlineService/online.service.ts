import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddEmailRequest, IAddTopicRequest, IChangePasswordRequest, IDeleteUserRequest, ILoginByTokenRequest, ILoginRequest, ILoginResponse, ILogoutRequest, IRegisterRequest } from 'app/models/backendRequests';
import { ICategory, ITopic } from 'app/models/forumModels';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {
  backendLink = "http://localhost:8001";
  mainAPIrouter = "/API";
  userAuthRouter = "/userAuth";
  forumDataRouter = "/forumData";

  constructor(
    private https: HttpClient,
  ) { }

  async loginByToken(token: string): Promise<ILoginResponse> {
    let link = `${this.backendLink}${this.mainAPIrouter}${this.userAuthRouter}/login/token`;
    let body: ILoginByTokenRequest = {
      authToken: token
    }
    let result: ILoginResponse = await this.https.post(link, body).toPromise() as ILoginResponse;
    return result;
  }

  async loginByCreds(username: string, password: string): Promise<ILoginResponse> {
    let link = `${this.backendLink}${this.mainAPIrouter}${this.userAuthRouter}/login/creds`;
    let body: ILoginRequest = {
      username: username,
      password: password,
    }
    let result: ILoginResponse = await this.https.post(link, body).toPromise() as ILoginResponse;
    return result;
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

  async addEmail(token: string, email: string) {
    let link = `${this.backendLink}${this.mainAPIrouter}${this.userAuthRouter}/addEmail`;
    let body: IAddEmailRequest = {
      authToken: token,
      email: email,
    }
    let result = await this.https.post(link, body).toPromise();
  }



  async addTopic(token: string, categoryId: number, title: string, text: string) {
    let request: IAddTopicRequest = {
      authToken: token,
      categoryId: categoryId,
      title: title,
      text: text,
    };

    let link = `${this.backendLink}${this.mainAPIrouter}${this.forumDataRouter}/addTopic`;
    console.log(link);
    let result = await this.https.post(link, request).toPromise();
  }

  async getCategories(){
    let link = `${this.backendLink}${this.mainAPIrouter}${this.forumDataRouter}/categories`;
    return await this.https.get(link).toPromise() as ICategory[];
  }

  async getTopics(categoryId: number){
    let link = `${this.backendLink}${this.mainAPIrouter}${this.forumDataRouter}/topics/${categoryId}`;
    return await this.https.get(link).toPromise() as ITopic[];
  }
}
