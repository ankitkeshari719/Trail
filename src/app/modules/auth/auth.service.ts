import { CookieService } from "ngx-cookie-service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import {
  ACTIVATE_USER_REGISTRATION,
  GET_LOCATIONS
} from "./../../config/backend.api.urls";

import {
  UserLoginRequest,
  InternalResponse,
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  UserRegistrationRequest,
  ForgetPasswordRequest,
  UserLoginResponse,
  BACKEND_RESPONSE_STATUS,
  ResetPasswordRequest,
  ActivateAccountRequest
} from "src/app/services";
import {
  LOGIN,
  REGISTRATION,
  FORGOT_PASSWORD,
  LOGOUT,
  RESET_PASSWORD
} from "src/app/config/backend.api.urls";
import { Router } from "@angular/router";
import { encryptData } from "src/app/helpers/crypto";
import { User } from "src/app/models";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {}

  /**
   * FUNCTION TO LOGIN WITH VALID CREDENCIAL
   * @param loginDetails HOLDS THE REQUIRED LOGIN REQUEST DETAILS
   * @returns user: OBJECT CONTAIN ALL THE DATA OF LOGGED-IN USER
   */
  loginUser(loginDetails: UserLoginRequest) {
    return this.http
      .post(createUrl(LOGIN), loginDetails, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, LOGIN);
        }),
        map(response => {
          if (response.status === BACKEND_RESPONSE_STATUS[2]) {
            return modifyResponse(response);
          }
          this.handleAuthentication(response, loginDetails);
        })
      );
  }

  /**
   * Activates user registration
   * @param activateAccountRequest
   * @returns user registration
   */
  activateUserRegistration(
    activateAccountRequest: ActivateAccountRequest
  ): Observable<InternalResponse> {
    return this.http
      .post(createUrl(ACTIVATE_USER_REGISTRATION), activateAccountRequest, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, REGISTRATION);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * FUNCTION REGISTER NEW USER
   * @param reqDetails HOLDS THE REQUIRED REGISTER DETAILS
   * @returns SUCCESSFUL/FAILDED MESSAGE
   */
  registerUser(
    reqDetails: UserRegistrationRequest
  ): Observable<InternalResponse> {
    return this.http
      .post(createUrl(REGISTRATION), reqDetails, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, REGISTRATION);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  handleUnathorized() {
    this.user.next(null);
  }

  /**
   * FUNCTION TO LOGOUT THE USER
   * @returns SUCCESSFUL/FAILDED MESSAGE
   */
  logout() {
    return this.http.get(createUrl(LOGOUT), { headers: getHeader() }).pipe(
      catchError((unauthorizedResponse: any) => {
        return handleError(unauthorizedResponse, LOGOUT);
      }),
      map(response => {
        if (response.status === BACKEND_RESPONSE_STATUS[0]) {
          this.user.next(null);
        }
        return modifyResponse(response);
      })
    );
  }

  /**
   * FUNCTION THAT HELPS TO FORGETED PASSWORD USER
   * @param userName: VALID EMAIL OF USER
   * @returns SUCCESSFUL/FAILDED MESSAGE
   */
  forgotPassword(reqDetails: ForgetPasswordRequest) {
    return this.http
      .post(createUrl(FORGOT_PASSWORD), reqDetails, { headers: getHeader() })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, FORGOT_PASSWORD);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   *FUNCTION THAT HELPS TO RESET PASSWORD USER
   * @param reqDetails HOLDS THE REQUIRED REQUEST DETAILS
   * @returns  SUCCESSFUL/FAILDED MESSAGE
   */
  resetPassword(reqDetails: ResetPasswordRequest) {
    return this.http
      .post(createUrl(RESET_PASSWORD), reqDetails, { headers: getHeader() })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, FORGOT_PASSWORD);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * FUNCTION THAT HELPS THE USER TO AUTO LOGIN ON REFRESH IF THE TOKEN IS VALID
   * @returns
   */
  autoLogin() {
    const userData: {
      accessToken: string;
      bucketAccesskey: string;
      bucketSecretkey: string;
      country: string;
      email: string;
      firstName: string;
      image: string;
      lastName: string;
      roleId: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.accessToken,
      userData.bucketAccesskey,
      userData.bucketSecretkey,
      userData.country,
      userData.email,
      userData.firstName,
      userData.image,
      userData.lastName,
      userData.roleId
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    } else {
      console.log("Session Expire");
    }
  }

  /**
   * FUNCTION TO HANDLE THE RESPONSE OF LOGIN REST API CALL
   * @param responsedata HOLD THE RESPONSE OF LOGIN REST API CALL
   */
  handleAuthentication(
    responsedata: UserLoginResponse,
    loginDetails: UserLoginRequest
  ) {
    const user = new User(
      responsedata.accessToken,
      responsedata.bucketAccesskey,
      responsedata.bucketSecretkey,
      responsedata.country,
      responsedata.email,
      responsedata.firstName,
      responsedata.image,
      responsedata.lastName,
      responsedata.roleId
    );
    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
    if (loginDetails.checked) {
      this.cookieService.set("email", loginDetails.email);
      this.cookieService.set("password", encryptData(loginDetails.password));
      this.cookieService.set("checked", loginDetails.checked.toString());
    }
    this.router.navigate(["/dashboard"]);
    this.toastr.success("Login Successful!");
  }

  getLocation() {
    return this.http
      .get(createUrl(GET_LOCATIONS), { headers: getHeader() })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_LOCATIONS);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
