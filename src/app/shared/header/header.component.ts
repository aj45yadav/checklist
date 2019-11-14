import { Component, OnInit, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { SocialLoginService } from 'src/app/services/social-login.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userBasicData;
  userInfo;
  apiBaseUrl: string;
  constructor(public authentication: SocialLoginService, public router: Router, public projectServices: ProjectService) {
    if (isDevMode()) {
      this.apiBaseUrl = 'http://dev-checklist.regalix.com/';
    } else {
      this.apiBaseUrl = '/';
    }
   }

  ngOnInit() {
    this.getUerBasicDetails();
  }
  logOut() {
    this.authentication.signOut();
    // this.router.navigate(['/']);
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
