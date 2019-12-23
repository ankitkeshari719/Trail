/* As there can be more than one HTTP interceptor and we need to maintain its order,
so it is better to create a const array as following. */
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { ErrorInterceptor } from "./error-interceptor";
import { LoggingInterceptor } from "./logging-interceptor";
import { AuthInterceptorService } from "./auth-interceptor.service";

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoggingInterceptor,
    multi: true
  }
];
