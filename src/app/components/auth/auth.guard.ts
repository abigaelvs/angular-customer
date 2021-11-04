import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const isAuthenticated = this.userService.isLoggedIn();
    const userRole = this.userService.getLocalRole();

    if (isAuthenticated) {
      if (route.data.roles && route.data.roles.indexOf(userRole) === -1) {
        this.router.navigate(["/"]);
        this.alertService.error("Forbidden", "You have no access to this page");
        return false;
      }

      return true;
    } else {
      this.router.navigateByUrl("/login");
      this.alertService.error("No Access", "Login or Sign Up First")
    }
    return true;
  }
  
}
