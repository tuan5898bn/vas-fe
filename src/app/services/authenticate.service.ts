import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../utils/Constant';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private http: HttpClient
  ) { }


  public authentication(credential) {
    return this.http.post(`${Constant.BE_URL}/api/v1/authentication`, credential).pipe(
      map(
        (value) => {
          this.saveToken(value)
          return value;
        }
      )
    )
  }

  private saveToken(val: any) {
    localStorage.setItem('token', val.token);
  }
  
  public getCurrentLogged(){
    return this.http.get(`${Constant.BE_URL}/api/current-logged`);
  }


  public getToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }

  public logout() {
    localStorage.removeItem('token');
  }

}
