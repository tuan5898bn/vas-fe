import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Authorities } from '../models/Authorities';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
   constructor(
      private authenticateService: AuthenticateService,
      private _router: Router
   ) {

   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const token = this.authenticateService.getToken();
      let authorities = [];
      let rs = false;
      if (token) {
         const payload = jwtDecode(token) as any;
         authorities = payload.authorities;
         authorities.forEach((val) => {
            if (val.authority === Authorities.ADMIN) {
               rs = true;
            }
         })
      }
      if (!rs) {
         this._router.navigate(['/access-denied'], { queryParams: { 'call-back': state.url } })
      }
      return rs;
   }
   saveItemPayload(payload){
      localStorage.setItem('item',JSON.stringify(payload))
   }

}