import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  Platform} from "src/app/services";
import {
  PLATFORM_API,
  GET_PLATFORM_LIST} from "src/app/config/backend.api.urls";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PlatformService {
  constructor(private http: HttpClient) {}

  /*************************************PLATFORM API'S********************************/
  /**
   * GET PLATFORM'S DETAILS USING ID
   * @param platformId
   * @returns
   */
  getPlatformDetails(platformId: string) {
    const params = new HttpParams().set("platformId", platformId);
    return this.http
      .get(createUrl(PLATFORM_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PLATFORM_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * ADD A NEW PLATFORM
   * @param newPlatformData
   * @returns
   */
  addNewPlatform(newPlatformData: Platform) {
    return this.http
      .post(createUrl(PLATFORM_API), newPlatformData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PLATFORM_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * EDIT THE EXISTING PLATFORM USING platform'ID
   * @param updatedPlatformData
   * @returns
   */
  editPlatform(updatedPlatformData: Platform) {
    const params = new HttpParams()
      .set("platformId", updatedPlatformData.platformId)
      .set("description", updatedPlatformData.description)
      .set("imageUrl", updatedPlatformData.imageUrl)
      .set("platformName", updatedPlatformData.platformName)
      .set("active", updatedPlatformData.active.toString());

    return this.http
      .put(createUrl(PLATFORM_API), updatedPlatformData, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PLATFORM_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * DELETE PLATFORM USING PLATFORM'ID
   * @param platformId
   * @returns
   */
  deletePlatform(platformId: string) {
    const params = new HttpParams().set("platformId", platformId);
    return this.http
      .delete(createUrl(PLATFORM_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PLATFORM_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Gets platform list
   * @returns
   */
  getPlatformList() {
    return this.http
      .get(createUrl(GET_PLATFORM_LIST), {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_PLATFORM_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
