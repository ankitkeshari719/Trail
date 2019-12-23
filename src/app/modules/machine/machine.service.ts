import { Injectable } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  Machine
} from "src/app/services";
import {
  MACHINE_API,
  GET_MACHINES_LIST,
  GET_MODEL_LIST
} from "src/app/config/backend.api.urls";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MachineService {
  constructor(private http: HttpClient) {}

  /*************************************MACHINE API'S********************************/
  /**
   * GET MACHINE'S DETAILS USING ID
   * @param machineId
   * @returns
   */
  getMachineDetails(vin: string) {
    const params = new HttpParams().set("vin", vin);
    return this.http
      .get(createUrl(MACHINE_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, MACHINE_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * ADD NEW MACHINE
   * @param newMachineData
   * @returns
   */
  addNewMachine(newMachineData: Machine) {
    return this.http
      .post(createUrl(MACHINE_API), newMachineData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, MACHINE_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * FUNCTION TO EDIT A MACHINE
   * @param machineEntryRequest
   * @returns
   */
  editMachine(updatedMachinedata: Machine) {
    const params = new HttpParams()
      .set("vin", updatedMachinedata.vin)
      .set("modelId", updatedMachinedata.modelId)
      .set("projectId", updatedMachinedata.projectId)
      .set("platformId", updatedMachinedata.platformId)
      .set("machineName", updatedMachinedata.machineName)
      .set("plantId", updatedMachinedata.plantId);
    return this.http
      .put(createUrl(MACHINE_API), updatedMachinedata, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, MACHINE_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Deletes machine
   * @param machineId
   * @returns
   */
  deleteMachine(vin: string) {
    const params = new HttpParams().set("vin", vin);
    return this.http
      .delete(createUrl(MACHINE_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, MACHINE_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Gets machine list
   * @returns
   */
  getMachineList() {
    return this.http
      .get(createUrl(GET_MACHINES_LIST), {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_MACHINES_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  getModelList() {
    return this.http
      .get(createUrl(GET_MODEL_LIST), {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_MODEL_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
