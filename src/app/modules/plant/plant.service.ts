import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  Plants
} from "src/app/services";
import { PLANT_API, GET_PLANT_LIST } from "src/app/config/backend.api.urls";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PlantService {
  constructor(private http: HttpClient) {}

  /*************************************PLANT API'S********************************/
  /**
   * GET PLANT'S DETAILS USING ID
   * @param plantId
   * @returns
   */
  getPlantDetails(plantId: string) {
    const params = new HttpParams().set("plantId", plantId);
    return this.http
      .get(createUrl(PLANT_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PLANT_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * ADD A NEW plant
   * @param newplantData
   * @returns
   */
  addNewPlant(newplantData: Plants) {
    return this.http
      .post(createUrl(PLANT_API), newplantData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PLANT_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * EDIT THE EXISTING plant USING plant'ID
   * @param updatedplantData
   * @returns
   */
  editPlant(updatedPlantData: Plants) {
    const params = new HttpParams()
      .set("plantId", updatedPlantData.plantId)
      .set("plantName", updatedPlantData.plantName)
      .set("address", updatedPlantData.address)
      .set("city", updatedPlantData.city)
      .set("country", updatedPlantData.country)
      .set("plantPOCEmail", updatedPlantData.plantPOCEmail)
      .set("plantPOCFName", updatedPlantData.plantPOCFName)
      .set("plantPOCLName", updatedPlantData.plantPOCLName)
      .set("active", updatedPlantData.active.toString());

    return this.http
      .put(createUrl(PLANT_API), updatedPlantData, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PLANT_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * DELETE PLANT USING PLANT'ID
   * @param plantId
   * @returns
   */
  deletePlant(plantId: string) {
    const params = new HttpParams().set("plantId", plantId);
    return this.http
      .delete(createUrl(PLANT_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PLANT_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Gets plant list
   * @returns
   */
  getPlantList() {
    return this.http
      .get(createUrl(GET_PLANT_LIST), {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_PLANT_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
