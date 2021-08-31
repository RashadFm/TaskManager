import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSerializer } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { LayoutComponent } from './Component/layout/layout.component';
import { TaskComponent } from './Component/task/task.component';
import { UsersComponent } from './Component/users/users.component';
import { RolesComponent } from './Component/roles/roles.component'
import { AuthGGuard } from '../app/Guard/auth-g.guard'

const routes: Routes = [
  {
    path: 'Home',
    component: LayoutComponent,
    children: [
      { path: 'Task', component: TaskComponent, canActivate: [AuthGGuard], pathMatch: 'full' },
      { path: 'Users', component: UsersComponent, canActivate: [AuthGGuard], },
      { path: 'Roles', component: RolesComponent, canActivate: [AuthGGuard], },
    ]
  },
  {
    path: '', component: HomeComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
