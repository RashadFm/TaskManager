import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {AppConfig} from 'app.config'

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  helper = new JwtHelperService();
  constructor(private httpClient:HttpClient ,private router: Router) { }

  directionUrl :any='';
  checkEmail(Obj:any) : Observable<any>{
    this.directionUrl= AppConfig.settings.baseUrl+"Auth/CheckEmail";
    return this.httpClient.post<any>(this.directionUrl,Obj);
  }

  NewOrganizationOperation(Obj:any) : Observable<any>{
    this.directionUrl= AppConfig.settings.baseUrl+"Auth/NewOrganizationOperation";
    return this.httpClient.post<any>(this.directionUrl,Obj);
  }

  Login(user:any) : Observable<any>{
    this.directionUrl= AppConfig.settings.baseUrl+"Auth/Login";
    return this.httpClient.post<any>(this.directionUrl,user);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !this.helper.isTokenExpired(token);
  }

  LogOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userinfo');
    this.router.navigate(['/']);
  }
}
