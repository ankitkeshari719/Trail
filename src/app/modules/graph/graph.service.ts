import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse
} from "src/app/services";
import {
  DUTYCYCLE_PERFORMANCE,
  FAULT_TREND,
  OVERALL_DRIVER_SCORE
} from "src/app/config/backend.api.urls";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GraphService {
  constructor(private http: HttpClient) {}

  getDutyCyclePerformedData() {
    return this.http
      .get(createUrl(DUTYCYCLE_PERFORMANCE), {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DUTYCYCLE_PERFORMANCE);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  getFaultTrendData(projectId) {
    const params = new HttpParams().set("projectId", projectId);
    return this.http
      .get(createUrl(FAULT_TREND), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, FAULT_TREND);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  getOverallDriverScore() {
    return this.http
      .get(createUrl(OVERALL_DRIVER_SCORE), {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, OVERALL_DRIVER_SCORE);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
