import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { take, exhaustMap } from "rxjs/operators";
import { AuthService } from "src/app/modules/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): import("rxjs").Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        if (user && user.token) {
          const cloneReq = req.clone({
            setHeaders: {
              accessToken: user.token
            }
          });
          return next.handle(cloneReq);
        }
      })
    );
  }
}
