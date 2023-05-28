import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  static authToken_key = "authTokenKey";
  constructor(
    private local: LocalStorageService,
  ) { }

  saveAuthToken(token: string): void {
    this.local.set(StorageService.authToken_key, token);
  }

  getAuthToken(): string {
    return this.local.get(StorageService.authToken_key);
  }

  removeAuthToken() {
    this.local.remove(StorageService.authToken_key);
  }

}
