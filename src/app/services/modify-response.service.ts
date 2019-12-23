/* THIS FILE CONTAINS HELPS TO MODIFY THE RESPONSES OD WEBSERVICES */
import { authorization_key, content_type } from "./../config/const";
import { HttpHeaders } from "@angular/common/http";
import { of } from "rxjs";

export enum BACKEND_RESPONSE_STATUS {
  "SUCCESS",
  "FAILURE",
  "ERROR"
}

export const enum INTERNAL_RESPONSE_STATUS {
  "FAILED",
  "FAILURE",
  "SUCCESS"
}

export interface InternalResponse {
  status: INTERNAL_RESPONSE_STATUS;
  success_data?: any;
  success_message?: any;
  error_message?: string;
  error_params?: {};
  code?: number;
}

/**
 * MODIFYING RESPONSE TO INTERNAL RESPONSE FOR CONSUMING IN COMPONENTS
 * @param response HOLDS THE BACKEND RESPONSE OBJECT
 */
export function modifyResponse(response: any): InternalResponse {
  if (response.status === BACKEND_RESPONSE_STATUS[0]) {
    // SUCCESS && FAILURE
    return {
      status: INTERNAL_RESPONSE_STATUS.SUCCESS,
      success_data: response.data ? response.data : "",
      success_message: response.message
    };
  } else if (response.status === BACKEND_RESPONSE_STATUS[2]) {
    // ERROR: THE BACKEND RETURED AN UNSUCCESSFUL RESPONSE CODE
    let errorParamsObj = {};
    if (response.errorResponse.messageParams.length) {
      response.errorResponse.messageParams.forEach(
        (key: string, index: number) => {
          errorParamsObj[index] = key;
        }
      );
    }
    return {
      status: INTERNAL_RESPONSE_STATUS.FAILED,
      error_message: response.error_message,
      code: response.error_code,
      error_params: errorParamsObj
    };
  } else if (response) {
    // SUCCESS WITH ONLY RESPONSE
    return {
      status: INTERNAL_RESPONSE_STATUS.SUCCESS,
      success_data: response
    };
  }
}

/**
 * HANDLE THE ERROR INTERNAL RESPONSE FOR CONSUMING IN COMPONENTS
 * @param errorRes HOLDS THE BACKEND RESPONSE OBJECT
 * @param url HOLDS THE REQUESTED URL
 */
export function handleError(errorRes: any, url: string) {
  errorRes.errorResponse.messageParams.push(url);
  return of(errorRes);
}

/**
 * FUNTION TO ADD ALL THE REQUIRED HEADERS IN EACH SERVICE CALL
 * @returns
 */
export function getHeader() {
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append("Content-Type", content_type);
  headers = headers.append("Authorization", authorization_key);
  return headers;
}

/**
 * COMMON FUNCTION TO CREATE COMPLETE URL WITH BASE URLAND PARAM
 * @param url HOLDS THE URL
 * @param [params] HOLDS THE PARAMS ADDED TO REQUEST
 * @returns url HOLDS THE COMPLETE URL
 */
export function createUrl(url: string, params: string[] = []): string {
  params.forEach((param, index) => {
    url = url.replace("$" + (index + 1), param);
  });
  return url;
}
