import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'token ' + token
        }
      });
    } else {
      this.router.navigate([`/`]);
    }

    /**
     * continues request execution
     */
    return next.handle(request).pipe(catchError((error, caught) => {
      // intercept the respons error and displace it to the console
      // console.log(error);
      this.handleAuthError(error);
      return of(error);
    }) as any);
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      // navigate /delete cookies or whatever
      // console.log('handled error ' + err.status);
      // localStorage.clear();
      this.cookieService.deleteAll();
      this.router.navigate([`/`]);
      // tslint:disable-next-line:max-line-length
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    throw err;
  }
}
