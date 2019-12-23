import { Subscription } from "rxjs";
import { Injectable, OnDestroy } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../modules/auth/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate, OnDestroy {
  private currentUser: Subscription;
  userData: any;
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    this.currentUser = this.authService.user.subscribe(userData => {
      this.userData = userData;
    });
    return new Promise((resolve: Function, reject: Function) => {
      if (this.userData) {
        // authorised so return true
        resolve(true);
      } else {
        // not logged in so redirect to login page with the return url
        this.router.navigate(["/auth"]);
        reject(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.currentUser.unsubscribe();
  }
}
