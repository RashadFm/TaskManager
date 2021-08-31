import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HttpInterceptorService } from '../app/Services/http-interceptor.service'
import { ErrorinterceptorService } from '../app/Services/Interceptor/errorinterceptor.service'
import { AppConfig } from 'app.config';
//components
import { AppComponent } from './app.component';
import { TaskComponent } from './Component/task/task.component';
import { LayoutComponent } from './Component/layout/layout.component';
import { HomeComponent } from './Component/home/home.component';
import { UsersComponent } from './Component/users/users.component';
import { RolesComponent } from './Component/roles/roles.component';
import { SignupComponent } from './Component/Parts/dialogs/signup/signup.component';
import { LogindialogComponent } from './Component/Parts/dialogs/logindialog/logindialog.component';
import { AccountdialogComponent } from './Component/Parts/dialogs/accountdialog/accountdialog.component';
import { TaskdialogComponent } from './Component/Parts/dialogs/taskdialog/taskdialog.component';
import { UserdialogComponent } from './Component/Parts/dialogs/userdialog/userdialog.component';
import { RoledialogComponent } from './Component/Parts/dialogs/roledialog/roledialog.component';
import { SnackbarComponent } from './Component/Parts/snackbar/snackbar.component';
//angular material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
//npm
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    LayoutComponent,
    HomeComponent,
    UsersComponent,
    SignupComponent,
    TaskdialogComponent,
    LogindialogComponent,
    AccountdialogComponent,
    RolesComponent,
    RoledialogComponent,
    UserdialogComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot(),
    MatMenuModule,
    MatSlideToggleModule,
    NgSelectModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorinterceptorService, multi: true },
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig, HttpClientModule],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
