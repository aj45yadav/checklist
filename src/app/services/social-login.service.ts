// This is Social login service used this service to sign with social sites
import { Injectable } from '@angular/core';

import {
  AuthService,
  SocialUser,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'ng-social-login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {
  public user: SocialUser;
  public loggedIn: boolean;

  constructor(public authService: AuthService, public httpClient: HttpClient) {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      // console.log('Logged : ' + this.loggedIn);
    });
  }
  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signWithFb() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signInWithLinkedIn() {
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID);
  }
  signOut() {
    this.authService.signOut();
  }
  makeServerSocialLoginCall(url, data) {
    return this.httpClient.post(url, data);
  }

}
