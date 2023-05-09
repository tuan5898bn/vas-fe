import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';


@Injectable()
export class JWTInterceptor implements HttpInterceptor {
   constructor(private authenticateService: AuthenticateService) {

   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.authenticateService.getToken();

      if (req.headers.get('authorization') || req.url=="http://restcountries.eu/rest/v2/all") {
         return next.handle(req);
      }
      if (token) {
         req = req.clone({
            setHeaders: {
               Authorization: `Bearer ${token}`
            }
         });
      }
      return next.handle(req);
   }
}