import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  RegisterOperatorRequest
} from "src/app/services";
import { REGISTER_OPERATOR } from "src/app/config/backend.api.urls";

@Injectable({
  providedIn: "root"
})
export class RegisterOperatorService {
  constructor(private http: HttpClient) {}

  registerOperator(reqData: RegisterOperatorRequest) {
    return this.http
      .post(createUrl(REGISTER_OPERATOR), reqData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, REGISTER_OPERATOR);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
