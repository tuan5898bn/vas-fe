import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   constructor(private authenticateService: AuthenticateService) { }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(catchError(err => {
         if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.authenticateService.logout();
         }
         const error = err.error.message || err.statusText;
         return throwError(error);
      }))
   }
}