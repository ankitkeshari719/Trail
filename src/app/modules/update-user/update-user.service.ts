import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse
} from "src/app/services";

import { UPDATE_USER } from "src/app/config/backend.api.urls";

@Injectable({
  providedIn: "root"
})
export class UpdateUserService {
  constructor(private http: HttpClient) {}

  getUserDetails(userId: string) {
    const params = new HttpParams().set("userId", userId);
    return this.http
      .get(createUrl(UPDATE_USER), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, UPDATE_USER);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  updateUserDetail(reqData) {
    const params = this.getUserUpdateParams(reqData);
    return this.http
      .put(createUrl(UPDATE_USER), reqData, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, UPDATE_USER);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  getUserUpdateParams(reqData) {
    const params = new HttpParams()
      .set("firstName", reqData.firstName)
      .set("lastName", reqData.lastName)
      .set("active", reqData.active)
      .set("address", reqData.address)
      .set("country", reqData.country)
      .set("phoneNumber", reqData.phoneNumber)
      .set("roleId", reqData.roleId)
      .set("userId", reqData.userId)
      .set("image", reqData.image)
      .set("smsLanguage", reqData.smsLanguage)
      .set("userEmail", reqData.userEmail);
    return params;
  }
}
