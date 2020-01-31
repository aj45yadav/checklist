import { Component, OnInit, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Checklist';
  constructor(public route: Router,
     public authService: AuthService, public projectService: ProjectService) { }
  ngOnInit() {
   const token = this.projectService.checkForToken();
   if (token) {
     this.route.navigate(['/projects']);
   } else {
     this.route.navigate(['/']);
   }
  }

  getImageUrl() {
    if (isDevMode()) {
        return 'url(\'../../assets/img/login-img.jpg\')';

    } else {
        return 'url(\'/static/assets/img/login-img.jpg\')';
    }
  }
}
