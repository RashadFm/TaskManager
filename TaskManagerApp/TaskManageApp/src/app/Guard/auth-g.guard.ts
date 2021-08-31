import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from '../Services/Auth/auth-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthServiceService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAuthenticated()) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}
