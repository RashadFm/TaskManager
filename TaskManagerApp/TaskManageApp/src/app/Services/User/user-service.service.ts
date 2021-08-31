import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'app.config'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }

  operationUrl: any = '';
  getUserInCompanyData(): Observable<any> {
    this.operationUrl = AppConfig.settings.baseUrl + 'User/GetUserInCompanyData';
    return this.httpClient.get<any>(this.operationUrl);
  }

  uploadCoverImg(Obj): Observable<any> {
    this.operationUrl = AppConfig.settings.baseUrl + 'User/UploadCoverImg';
    return this.httpClient.post<any>(this.operationUrl, Obj);
  }

  saveCoverImg(Obj: any): Observable<any> {
    this.operationUrl = AppConfig.settings.baseUrl + 'User/SaveCoverImg';
    return this.httpClient.post<any>(this.operationUrl, Obj);
  }

  ChangeUserAccount(Obj: any): Observable<any> {
    this.operationUrl = AppConfig.settings.baseUrl + 'User/ChangeUserAccount';
    return this.httpClient.post<any>(this.operationUrl, Obj);
  }

  roleOperation(Obj: any): Observable<any> {
    this.operationUrl = AppConfig.settings.baseUrl + 'User/RoleOperation';
    return this.httpClient.post<any>(this.operationUrl, Obj);
  }

  userOperation(Obj: any): Observable<any> {
    this.operationUrl = AppConfig.settings.baseUrl + 'User/UserOperation';
    return this.httpClient.post<any>(this.operationUrl, Obj);
  }
}
