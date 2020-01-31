import { Component, OnInit, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userBasicData;
  userInfo;
  apiBaseUrl: string;
  constructor(public router: Router, public projectServices: ProjectService,
     private cookieService: CookieService) {
    if (isDevMode()) {
      this.apiBaseUrl = 'https://dev-checklist.regalix.com/';
    } else {
      this.apiBaseUrl = '/';
    }
   }

  ngOnInit() {
    this.getUerBasicDetails();
  }
  logOut() {
    // this.authentication.signOut();
    // this.router.navigate(['/']);
    this.cookieService.deleteAll();
    window.location.href = this.apiBaseUrl + 'logout/';
  }
  getUerBasicDetails() {
    this.projectServices.getUserDeatails().subscribe(
      (data) => {
        this.userBasicData = data;
        this.userInfo = JSON.parse(this.userBasicData);
        this.projectServices.setSubject(this.userBasicData);
      }
    );
  }
}
