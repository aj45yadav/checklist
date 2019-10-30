import { Component, OnInit } from '@angular/core';
import { SocialLoginService } from '../services/social-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Checklist';
  unsubscribe = [];
  errors: { non_field_errors: Array<string>, email: string, password: string };
  constructor(public authentication: SocialLoginService, public route: Router) { }
  ngOnInit() {
  }
  loginWithGoogle() {
    // let attempt = 0;
    const g = this.authentication.authService.authState
      .subscribe((user) => {
        if (user) {
          if (user.email.indexOf('regalix-inc') !== -1) {
            this.route.navigate(['/business-unit']);
            // this.authentication.makeServerSocialLoginCall('/rest-auth/google/', { access_token: user.token })
            //   .subscribe(
            //     (data) => {
            //       if (data['user'].is_active) {
            //         this.finishLogin(data);

            //       } else {
            //         this.errors = {
            //           non_field_errors: ['Account is disabled.'],
            //           email: '',
            //           password: ''
            //         };
            //       }
            //     },
            //     (error) => {
            //       this.errors = error.error;
            //       attempt++;
            //       if (attempt < 2) {
            //         this.authentication.signInWithGoogle();
            //       }
            //     }
            //   );
          } else {
            this.errors = {
              non_field_errors: ['You need to be a Regalix staff to access this tool.'],
              email: '',
              password: ''
            };
            this.signOut();
          }
        } else {
          this.authentication.signInWithGoogle();
        }
      });
    this.unsubscribe.push(g);
  }
  signOut() {
    this.authentication.signOut();
  }
}
