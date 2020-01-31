import { Component, OnInit, isDevMode } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  apiBaseUrl;
  constructor(private cookieService: CookieService) {
    if (isDevMode()) {
      this.apiBaseUrl = 'https://dev-checklist.regalix.com/';
    } else {
      this.apiBaseUrl = '/';
    }
   }

  ngOnInit() {
  }
  logOut() {
    // this.authentication.signOut();
    // this.router.navigate(['/']);
    this.cookieService.deleteAll();
    window.location.href = this.apiBaseUrl + 'logout/';
  }
}
