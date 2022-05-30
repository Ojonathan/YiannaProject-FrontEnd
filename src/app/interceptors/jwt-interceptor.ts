import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    // tslint:disable-next-line:prefer-const
    // console.log("interceptado");
    const user = localStorage.getItem('currentUser');
    if (user) {
      // console.log("si hay en el navegador");
      const currentUser = JSON.parse(user);
      if (currentUser && currentUser.token) {
        // console.log(currentUser.token);
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
