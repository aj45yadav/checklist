import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiBaseUrl: string;

  constructor(public http: HttpClient) {
    if (isDevMode()) {
      this.apiBaseUrl = 'http://dev-checklist.regalix.com/';
    }  else {
      this.apiBaseUrl = '/';
    }
  }
  login(data) {
    const url = this.apiBaseUrl + 'login/';
    return this.http.post(url, data);
  }
  // getLoginData() {
  //   const url = this.apiBaseUrl +  'login/';
  //   return this.http.get(url);
  // }
}
