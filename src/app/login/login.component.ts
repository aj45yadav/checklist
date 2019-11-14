import { Component, OnInit } from '@angular/core';
import { SocialLoginService } from '../services/social-login.service';
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
  unsubscribe = [];
  errors: { non_field_errors: Array<string>, email: string, password: string };
  loginData;
  constructor(public authentication: SocialLoginService, public route: Router,
     public authService: AuthService, public projectService: ProjectService) { }
  ngOnInit() {
   const token = this.projectService.checkForToke();
   if (token) {
     this.route.navigate(['/projects']);
   } else {
     this.route.navigate(['/']);
   }
  }
  loginWithGoogle() {
    // let attempt = 0;
    const g = this.authentication.authService.authState
      .subscribe((user) => {
        if (user) {
          if (user.email.indexOf('regalix-inc') !== -1) {
            this.route.navigate(['/projects']);
            // this.signIn();
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
  signIn() {
    const data = {
      email : this.authentication.user.email
    };
    this.authService.login(data).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      (data) => {
        this.loginData.push(data);
      }
    );
  }
  // signData() {
  //   this.authService.getLoginData().subscribe(
  //     (data) => {
  //       this.loginData = data;
  //       console.log(this.loginData);
  //     }
  //   );
  // }
  signOut() {
    this.authentication.signOut();
  }
}
