import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from 'app.config'

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  constructor(private httpClient: HttpClient) { }

  operationUrl: any = '';
  getGlobalGridData(type: string): Observable<any> {
    this.operationUrl = AppConfig.settings.baseUrl + 'Global/GetGlobalGridData/' + type;
    return this.httpClient.get<any>(this.operationUrl);
  }

  getGlobalModalData(type, id): Observable<any> {
    this.operationUrl = AppConfig.settings.baseUrl + 'Global/GetGlobalModalData/' + type + '/' + id;
    return this.httpClient.get<any>(this.operationUrl);
  }

  changeGlobalStatus(type, status, id): Observable<any> {
    this.operationUrl = AppConfig.settings.baseUrl + 'Global/ChangeGlobalStatus/' + type + '/' + status + '/' + id;
    return this.httpClient.get<any>(this.operationUrl);
  }

}
