import { Router } from "@angular/router";
import { AuthService } from "./../../modules/auth/auth.service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error("An error occurred:", err);
        } else {
          if (err.error.code === 401 || err.status === 401) {
            this.authService.handleUnathorized();
            this.router.navigate(["/session-expire"]);
            localStorage.removeItem("userData");
          }
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong
          console.error(
            `Backend returned code ${
              err.error.code ? err.error.code : err.error.status
            }, body was: ${err.message}`
          );
        }
        return throwError({
          status: "ERROR",
          error_code: err.status,
          error_message: err.error.message,
          errorResponse: {
            messageParams: []
          }
        });
      })
    );
  }
}
