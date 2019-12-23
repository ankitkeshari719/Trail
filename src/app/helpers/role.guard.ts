import { Subscription } from "rxjs";
import { Injectable, OnDestroy } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "../modules/auth/auth.service";

@Injectable()
export class RoleGuard implements CanActivate, OnDestroy {
  private currentUser: Subscription;
  userData: any;
  constructor(
    private _authGuard: AuthGuard,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this._authGuard.canActivate(route, state).then((auth: boolean) => {
      this.currentUser = this.authService.user.subscribe(userData => {
        this.userData = userData;
      });

      // If not unauthorised access, redirect to auth page
      if (!auth) {
        return Promise.resolve(false);
      }
      if (
        route.data.roles &&
        !route.data.roles.includes(this.userData.roleName)
      ) {
        // role not authorised so redirect to dashboard page
        this.router.navigate(["/dashboard"]);
        return Promise.resolve(false);
      }

      // authorised so return true
      return Promise.resolve(true);
    });
  }

  ngOnDestroy(): void {
    this.currentUser.unsubscribe();
  }
}
