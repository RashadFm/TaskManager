import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppConfig } from './src/app/Models/IAppConfig.model';


@Injectable()
export class AppConfig {
    static settings: IAppConfig;
    constructor(private http: HttpClient,
        //private keycloak: KeycloakService,
    ) { }
    load() {
        //const jsonFile = `assets/config/config.${environment.name}.json`;
        const jsonFile = `assets/config.json`;
        return new Promise<IAppConfig>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: any) => {
                AppConfig.settings = <IAppConfig>response;
                resolve(<IAppConfig>response);
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}