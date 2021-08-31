import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'app.config'

@Injectable({
  providedIn: 'root'
})

export class TaskServiceService {
  constructor(private httpClient: HttpClient) { }
  operationUrl: any = '';
  taskOperation(Obj): Observable<any> {
    this.operationUrl =AppConfig.settings.baseUrl + "Task/TaskOperation";
    return this.httpClient.post<any>(this.operationUrl, Obj);
  }
}
