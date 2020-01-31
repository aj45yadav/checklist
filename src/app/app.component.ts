import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';
  constructor(public route: Router, public cookieService: CookieService, public projectServices: ProjectService) {
  }
  ngOnInit() {
  }

  hideHeader() {
    return {
      'hide': this.route.url === '/',
    };
  }
}
