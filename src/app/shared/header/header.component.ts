import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialLoginService } from 'src/app/services/social-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authentication: SocialLoginService, public router: Router) { }

  ngOnInit() {
  }
  logOut() {
    this.authentication.signOut();
    // this.router.navigate(['/']);
    window.location.href = '/';
  }

}
