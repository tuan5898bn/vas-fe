
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
   constructor(
      private router: Router,
      private authenticateService: AuthenticateService
   ) { }



   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const token = this.authenticateService.getToken();
      if (token) {
         return true;
      }

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return true;
   }
}