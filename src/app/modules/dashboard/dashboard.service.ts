import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { catchError, map } from "rxjs/operators";

import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  Project,
  Machine,
  ProjectUser,
  PojectEnduranceCycle,
  DriverSheet,
  DSTemplateRequest
} from "src/app/services";
import {
  GET_ALL_DASHBOARD_COUNTS,
  GET_PROJECT_DETAILS,
  GET_PROJECT_LIST,
  GET_PROJECT_MACHINE_LIST,
  PROJECT_MACHINE_API,
  PROJECT_USER_API,
  PROJECT_ENDURANCE_API,
  DRIVER_SHEETS_API,
  GET_PROJECT_FAULT_LIST,
  DS_TEMPLATE_LIST,
  DS_TEMPLATES_API
} from "src/app/config/backend.api.urls";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  dialogData: any;
  title = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) {}

  public setTitle(newTitle: string) {
    this.title.next(newTitle);
  }

  getDialogData() {
    return this.dialogData;
  }

  /*************************************Dashboard Data********************************/

  /**
   * GETS THE COUNT OF PROJECT, OPERATORS AND MACHINES
   * @returns
   */
  getDashboardCount() {
    return this.http
      .get(createUrl(GET_ALL_DASHBOARD_COUNTS), { headers: getHeader() })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_ALL_DASHBOARD_COUNTS);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * GETS THE LIST OF PROJECT, OPERATORS AND MACHINES
   * @param sort COLUMN NAME
   * @param order ASC/DESC
   * @param pageNumber 1-TOTAL LENGTH / PAGE_SIZE
   * @param pageSize 5/10/25/100
   * @returns
   */
  getDashboardDataList(
    url: string,
    sort: string,
    order: string,
    pageNumber: number,
    pageSize: number
  ) {
    const params = new HttpParams()
      // .set("sort", sort)
      // .set("order", order)
      .set("pageNumber", pageNumber.toString())
      .set("pageSize", pageSize.toString());
    return this.http
      .get(createUrl(url), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, url);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * GETS ALL DASHBOARD DATA
   * ACTIVITY LIST
   * VIN LIST
   * @param URL Get the url of the API
   * @returns Return the data a/c to th url
   */
  getDashboardData(URL: string) {
    return this.http.get(createUrl(URL), { headers: getHeader() }).pipe(
      catchError((unauthorizedResponse: any) => {
        return handleError(unauthorizedResponse, URL);
      }),
      map(response => {
        return modifyResponse(response);
      })
    );
  }

  /*************************************Project********************************/

  getDSTemplateList() {
    return this.http
      .get(createUrl(DS_TEMPLATE_LIST), {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_TEMPLATE_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * GET THE DATA OF SELECTED TEMPLATE
   * @param driverSheetTemplateId DRIVERSHEET ID TO FETCH THE TEMPLATE DATA
   * @returns
   */
  getDSTemplateData(driverSheetTemplateId: string) {
    const params = new HttpParams().set(
      "driverSheetTemplateId",
      driverSheetTemplateId
    );
    return this.http
      .get(createUrl(DS_TEMPLATES_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_TEMPLATES_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * ADD NEW DRIVER SHEET TEMPLATE
   * @param data
   * @returns
   */
  addNewDSTemplate(data: DSTemplateRequest) {
    return this.http
      .post(createUrl(DS_TEMPLATES_API), data, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_TEMPLATES_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * UPDATE NEW DRIVER SHEET TEMPLATE
   * @param data
   * @returns
   */
  updateDSTemplate(data: DSTemplateRequest) {
    return this.http
      .put(createUrl(DS_TEMPLATES_API), data, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_TEMPLATES_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /*************************************Project********************************/
  /**
   * GET PROJECT'S DETAILS USING ID
   * @param projectId
   * @returns
   */
  getProjectDetails(projectId: string) {
    const params = new HttpParams().set("projectId", projectId);
    return this.http
      .get(createUrl(GET_PROJECT_DETAILS), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_PROJECT_DETAILS);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * ADD A NEW PROJECT
   * @param newProjectData
   * @returns
   */
  addNewProject(newProjectData: Project) {
    return this.http
      .post(createUrl(GET_PROJECT_LIST), newProjectData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_PROJECT_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * EDIT THE EXISTING PROJECT USING PROJECT'ID
   * @param updatedProjectData
   * @returns
   */
  editProject(updatedProjectData: Project) {
    const params = new HttpParams()
      .set("projectId", updatedProjectData.projectId)
      .set("description", updatedProjectData.description)
      .set("imageUrl", updatedProjectData.imageUrl)
      .set("projectName", updatedProjectData.projectName)
      .set("active", updatedProjectData.active.toString());

    return this.http
      .put(createUrl(GET_PROJECT_LIST), updatedProjectData, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_PROJECT_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * DELETE PROJECT USING project'ID
   * @param projectId
   * @returns
   */
  deleteProject(projectId: string) {
    const params = new HttpParams().set("projectId", projectId);
    return this.http
      .delete(createUrl(GET_PROJECT_LIST), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_PROJECT_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Gets project list
   * @returns
   */
  getProjectList() {
    return this.http
      .get(createUrl(GET_PROJECT_LIST), {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_PROJECT_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  // -------------------------------- Project Machine --------------------------
  /**
   * Get Projects Machine list
   * @param projectId
   * @returns
   */
  getProjectMachineList(projectId: string) {
    const params = new HttpParams().set("projectId", projectId);
    return this.http
      .get(createUrl(GET_PROJECT_MACHINE_LIST), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_PROJECT_MACHINE_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  editProjectMachine(updatedMachinedata: Machine) {
    this.dialogData = updatedMachinedata;
    const params = new HttpParams()
      .set("vin", updatedMachinedata.vin)
      .set("modelId", updatedMachinedata.modelId)
      .set("active", updatedMachinedata.active)
      .set("platformId", updatedMachinedata.platformId)
      .set("plantId", updatedMachinedata.plantId)
      .set("targetHours", updatedMachinedata.targetHours)
      .set("projectMachineId", updatedMachinedata.projectMachineId);
    return this.http
      .put(createUrl(PROJECT_MACHINE_API), updatedMachinedata, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PROJECT_MACHINE_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Deletes project machine
   * @param projectMachineId
   * @returns
   */
  deleteProjectMachine(projectMachineId: string) {
    const params = new HttpParams().set("projectMachineId", projectMachineId);
    return this.http
      .delete(createUrl(PROJECT_MACHINE_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PROJECT_MACHINE_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  // -------------------------------- Project Users --------------------------

  editProjectUser(updatedUserdata: ProjectUser) {
    this.dialogData = updatedUserdata;
    const params = new HttpParams()
      .set("projectUserId", updatedUserdata.projectUserId)
      .set("responsibility", updatedUserdata.responsibility)
      .set("role", updatedUserdata.role)
      .set("mobileNumber", updatedUserdata.mobileNumber)
      .set("plantId", updatedUserdata.plantId)
      .set("projectId", updatedUserdata.projectId)
      .set("active", updatedUserdata.active.toString());
    return this.http
      .put(createUrl(PROJECT_USER_API), updatedUserdata, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PROJECT_USER_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Deletes project machine
   * @param projectMachineId
   * @returns
   */
  deleteProjectUser(projectMachineId: string) {
    const params = new HttpParams().set("projectUserId", projectMachineId);
    return this.http
      .delete(createUrl(PROJECT_USER_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PROJECT_USER_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  // -------------------------------- Project Endurance Cycle --------------------------

  editProjectEndurance(updatedMachinedata: PojectEnduranceCycle) {
    this.dialogData = updatedMachinedata;
    const params = new HttpParams()
      .set(
        "projectEnduranceCycleId",
        updatedMachinedata.projectEnduranceCycleId
      )
      .set("enduranceCycleId", updatedMachinedata.enduranceCycleId)
      .set("instruction", updatedMachinedata.instruction)
      .set("efforts", updatedMachinedata.efforts)
      .set("hours", updatedMachinedata.unit);
    return this.http
      .put(createUrl(PROJECT_ENDURANCE_API), updatedMachinedata, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PROJECT_ENDURANCE_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  deleteProjectEndurance(projectEnduranceCycleId: string) {
    const params = new HttpParams().set(
      "projectEnduranceCycleId",
      projectEnduranceCycleId
    );
    return this.http
      .delete(createUrl(PROJECT_ENDURANCE_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, PROJECT_ENDURANCE_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  // -------------------------------- Project Driver Sheet --------------------------

  /**
   * Adds new driver sheet
   * @param newDriverSheetData
   * @returns
   */
  addNewDriverSheet(newDriverSheetData: DriverSheet) {
    return this.http
      .post(createUrl(DRIVER_SHEETS_API), newDriverSheetData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DRIVER_SHEETS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
  // -------------------------------- Project Fault --------------------------
  /**
   * Gets Project fault list
   * @param projectId
   * @returns
   */
  getProjectFaultList(projectId: string) {
    const params = new HttpParams().set("projectId", projectId);
    return this.http
      .get(createUrl(GET_PROJECT_FAULT_LIST), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, GET_PROJECT_FAULT_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
