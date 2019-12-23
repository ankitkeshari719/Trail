import { Injectable } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  Device
} from "src/app/services";
import { DEVICES_API, GET_DEVICE_LIST } from "src/app/config/backend.api.urls";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DeviceService {
  constructor(private http: HttpClient) {}

  /*************************************DEVICE API'S********************************/
  /**
   * GET DEVICE DETAILS USING ID
   * @param deviceId
   * @returns
   */
  getDeviceDetails(deviceId: string) {
    const params = new HttpParams().set("deviceId", deviceId);
    return this.http
      .get(createUrl(DEVICES_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DEVICES_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * ADD A NEW DEVICE
   * @param newDeviceData
   * @returns
   */
  addNewDevice(newDeviceData: Device) {
    return this.http
      .post(createUrl(DEVICES_API), newDeviceData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DEVICES_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * EDIT THE EXISTING DEVICE USING DEVICE'ID
   * @param updatedDeviceData
   * @returns
   */
  editDevice(updatedDeviceData: Device) {
    const params = new HttpParams()
      .set("deviceId", updatedDeviceData.deviceId)
      .set("deviceName", updatedDeviceData.deviceName)
      .set("oS", updatedDeviceData.oS)
      .set("identificationKeys", updatedDeviceData.identificationKeys)
      .set("installed", updatedDeviceData.installed.toString())
      .set("active", updatedDeviceData.active.toString());

    return this.http
      .put(createUrl(DEVICES_API), updatedDeviceData, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DEVICES_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * DELETE DEVICE USING DEVICE'ID
   * @param deviceId
   * @returns
   */
  deleteDevice(deviceId: string) {
    const params = new HttpParams().set("deviceId", deviceId);
    return this.http
      .delete(createUrl(DEVICES_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DEVICES_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  getDeviceList() {
    return this.http
      .get(createUrl(GET_DEVICE_LIST), {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_DEVICE_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
