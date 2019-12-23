import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  UpdateUserRoleRequest
} from "src/app/services";
import { UPDATE_USER_ROLE } from "src/app/config/backend.api.urls";

@Injectable({
  providedIn: "root"
})
export class UserRolesService {
  constructor(private http: HttpClient) {}

  updateUserRole(userRolesData: UpdateUserRoleRequest) {
    const params = new HttpParams()
      .set("userName", userRolesData.userName)
      .set("roleId", userRolesData.roleId);

    return this.http
      .put(createUrl(UPDATE_USER_ROLE), userRolesData, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, UPDATE_USER_ROLE);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
