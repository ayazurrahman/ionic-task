import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(route.data.role == "user" && this.authService.autoLogin()){
        return this.authService.isLoggedIn;
      }
      if(route.data.role == "admin" && this.authService.isAdminLogged){
        return this.authService.isAdminLogged;
      }
      this.route.navigateByUrl('/auth')

  }


}
