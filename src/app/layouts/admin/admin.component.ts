import { Component, OnInit, isDevMode } from '@angular/core';
import { SocialLoginService } from 'src/app/services/social-login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  apiBaseUrl;
  constructor(public authentication: SocialLoginService) {
    if (isDevMode()) {
      this.apiBaseUrl = 'http://dev-checklist.regalix.com/';
    } else {
      this.apiBaseUrl = '/';
    }
   }

  ngOnInit() {
  }
  logOut() {
    this.authentication.signOut();
    // this.router.navigate(['/']);
    window.location.href = this.apiBaseUrl + 'logout/';
  }
}
