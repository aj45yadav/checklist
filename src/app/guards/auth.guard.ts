import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userRole;
  role;
  constructor(private cookieService: CookieService, public projectService: ProjectService, public router: Router) {
    this.projectService.cast.subscribe(
      data => {
        this.userRole = JSON.parse(data);
        if (this.userRole) {
          this.role = this.userRole.logged_user.role;
        }
      },
      error => {
      }
    );
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // console.log(this.role);
    if (this.role === '1') {
      // this.router.navigate(['/']);
      return true;
    }
    return false;
  }
}
