import {
  DriverSheet,
  DriverSheetQuestion,
  DriverSheetSubmitted,
  DriverSheetSubmittedAns,
  DSTemplateRequest
} from "./../../services/configurations.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse} from "src/app/services";
import {
  DRIVER_SHEETS_API,
  DRIVER_SHEET_QUESTIONS_API,
  DS_SUBMITTED_API,
  DS_SUBMITTED_ANSWERS_API,
  DS_TEMPLATES_API,
  DS_TEMPLATE_LIST,
  QUES_CATEGORIES_LIST_API,
  QUESTIONS_LIST_API
} from "src/app/config/backend.api.urls";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CommonsService {
  constructor(private http: HttpClient) {}

  /*************************************DRIVER_SHEETS********************************/
  /**
   * Gets driver sheet details
   * @param driverSheetId
   * @returns
   */
  getDriverSheetDetails(driverSheetId: string) {
    const params = new HttpParams().set("driverSheetId", driverSheetId);
    return this.http
      .get(createUrl(DRIVER_SHEETS_API), {
        headers: getHeader(),
        params: params
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

  /**
   * Edits driver sheet
   * @param updatedDriverSheetData
   * @returns
   */
  editDriverSheet(updatedDriverSheetData: DriverSheet) {
    const params = new HttpParams()
      .set("driverSheetId", updatedDriverSheetData.driverSheetId)
      .set("driverSheetName", updatedDriverSheetData.driverSheetName)
      .set("description", updatedDriverSheetData.description)
      .set("projectId", updatedDriverSheetData.projectId)
      .set("current", updatedDriverSheetData.current.toString())
      .set("active", updatedDriverSheetData.active.toString());
    return this.http
      .put(createUrl(DRIVER_SHEETS_API), updatedDriverSheetData, {
        headers: getHeader(),
        params: params
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

  /**
   * Deletes driver sheet
   * @param driverSheetId
   * @returns
   */
  deleteDriverSheet(driverSheetId: string) {
    const params = new HttpParams().set("driverSheetId", driverSheetId);
    return this.http
      .delete(createUrl(DRIVER_SHEETS_API), {
        headers: getHeader(),
        params: params
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

  /*************************************DRIVER_SHEETS_SUBMITTED********************************/
  /**
   * Gets Driver Sheet submitted
   * @param driverSheetSubmittedId
   * @returns
   */
  getDS_Submitted(driverSheetSubmittedId: string) {
    const params = new HttpParams().set(
      "driverSheetSubmittedId",
      driverSheetSubmittedId
    );
    return this.http
      .get(createUrl(DS_SUBMITTED_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_SUBMITTED_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Adds new Driver Sheet submitted
   * @param newDS_SubmittedData
   * @returns
   */
  addNewDS_Submitted(newDS_SubmittedData: DriverSheetSubmitted) {
    return this.http
      .post(createUrl(DS_SUBMITTED_API), newDS_SubmittedData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_SUBMITTED_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Edits driver sheet Submitted
   * @param updatedDriverSheetData
   * @returns
   */
  editDS_Submitted(updatedDS_SheetData: DriverSheetSubmitted) {
    const params = new HttpParams()
      .set("driverSheetSubmittedId", updatedDS_SheetData.driverSheetSubmittedId)
      .set("driverSheetId", updatedDS_SheetData.driverSheetId)
      .set("projectMachineId", updatedDS_SheetData.projectMachineId)
      .set("userId", updatedDS_SheetData.userId)
      .set("shiftId", updatedDS_SheetData.shiftId)
      .set("deviceId", updatedDS_SheetData.deviceId)
      .set("language", updatedDS_SheetData.language)
      .set("inProgress", updatedDS_SheetData.inProgress.toString())
      .set("startHours", updatedDS_SheetData.startHours.toString())
      .set("endHours", updatedDS_SheetData.endHours.toString())
      .set(
        "testingHoursCompleted",
        updatedDS_SheetData.testingHoursCompleted.toString()
      )
      .set("active", updatedDS_SheetData.active.toString());
    return this.http
      .put(createUrl(DS_SUBMITTED_API), updatedDS_SheetData, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_SUBMITTED_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Deletes driver sheet Submitted
   * @param driverSheetSubmittedId
   * @returns
   */
  deleteDS_Submitted(driverSheetSubmittedId: string) {
    const params = new HttpParams().set(
      "driverSheetSubmittedId",
      driverSheetSubmittedId
    );
    return this.http
      .delete(createUrl(DS_SUBMITTED_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_SUBMITTED_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /*************************************DRIVER_SHEETS_SUBMITTED_ANSWERS********************************/
  /**
   * Gets ds submitted ans
   * @param driverSheetAnsweredId
   * @returns
   */
  getDS_SubmittedAns(driverSheetAnsweredId: string) {
    const params = new HttpParams().set(
      "driverSheetAnsweredId",
      driverSheetAnsweredId
    );
    return this.http
      .get(createUrl(DS_SUBMITTED_ANSWERS_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_SUBMITTED_ANSWERS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Adds new Driver Sheet submitted And
   * @param newDS_SubmittedAnsData
   * @returns
   */
  addNewDS_SubmittedAns(newDS_SubmittedAnsData: DriverSheetSubmittedAns) {
    return this.http
      .post(createUrl(DS_SUBMITTED_ANSWERS_API), newDS_SubmittedAnsData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_SUBMITTED_ANSWERS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Edits driver sheet Submitted Answer
   * @param updatedDriverSheetData
   * @returns
   */
  editDS_SubmittedAns(updatedDSS_AnswerData: DriverSheetSubmittedAns) {
    const params = new HttpParams()
      .set("driverSheetAnsweredId", updatedDSS_AnswerData.driverSheetAnsweredId)
      .set(
        "driverSheetSubmittedId",
        updatedDSS_AnswerData.driverSheetSubmittedId
      )
      .set("driverSheetQuestionId", updatedDSS_AnswerData.driverSheetQuestionId)
      .set("answer", updatedDSS_AnswerData.answer)
      .set("comment", updatedDSS_AnswerData.comment);

    return this.http
      .put(createUrl(DS_SUBMITTED_ANSWERS_API), updatedDSS_AnswerData, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_SUBMITTED_ANSWERS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Deletes driver sheet Submitted Answer
   * @param driverSheetAnsweredId
   * @returns
   */
  deleteDS_SubmittedAns(driverSheetAnsweredId: string) {
    const params = new HttpParams().set(
      "driverSheetAnsweredId",
      driverSheetAnsweredId
    );
    return this.http
      .delete(createUrl(DS_SUBMITTED_ANSWERS_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DS_SUBMITTED_ANSWERS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /*************************************DRIVER_SHEETS_QUESTION'S*********************/
  /**
   * Gets driver sheet question details
   * @param driverQuestionSheetId
   * @returns
   */
  getDriverSheetQuestionDetails(driverQuestionSheetId: string) {
    const params = new HttpParams().set(
      "driverQuestionSheetId",
      driverQuestionSheetId
    );
    return this.http
      .get(createUrl(DRIVER_SHEET_QUESTIONS_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DRIVER_SHEET_QUESTIONS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Adds new driver sheet question
   * @param newDriverSheetQuestionData
   * @returns
   */
  addNewDriverSheetQuestion(newDriverSheetQuestionData: DriverSheetQuestion) {
    return this.http
      .post(createUrl(DRIVER_SHEET_QUESTIONS_API), newDriverSheetQuestionData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DRIVER_SHEET_QUESTIONS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Edits driver sheet question
   * @param updatedDriverSheetQuestionData
   * @returns
   */
  editDriverSheetQuestion(updatedDriverSheetQuestionData: DriverSheetQuestion) {
    const params = new HttpParams()
      .set(
        "driverSheetQuestionId",
        updatedDriverSheetQuestionData.driverSheetQuestionId
      )
      .set("questionId", updatedDriverSheetQuestionData.questionId)
      .set("driverSheetId", updatedDriverSheetQuestionData.driverSheetId)
      .set("active", updatedDriverSheetQuestionData.active.toString());
    return this.http
      .put(
        createUrl(DRIVER_SHEET_QUESTIONS_API),
        updatedDriverSheetQuestionData,
        {
          headers: getHeader(),
          params: params
        }
      )
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DRIVER_SHEET_QUESTIONS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Deletes driver sheet question
   * @param driverQuestionSheetId
   * @returns
   */
  deleteDriverSheetQuestion(driverQuestionSheetId: string) {
    const params = new HttpParams().set(
      "driverQuestionSheetId",
      driverQuestionSheetId
    );
    return this.http
      .delete(createUrl(DRIVER_SHEET_QUESTIONS_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, DRIVER_SHEET_QUESTIONS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /*************************************DRIVERSHEET TEMPLATE ********************************/
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

  /**
   * Gets question list
   * @param categoryId
   * @returns
   */
  getQuestionList(questionCategoryId: string) {
    const params = new HttpParams().set(
      "questionCategoryId",
      questionCategoryId
    );
    return this.http
      .get(createUrl(QUESTIONS_LIST_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, QUESTIONS_LIST_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Gets question category list
   * @returns
   */
  getQuestionCategoryList() {
    return this.http
      .get(createUrl(QUES_CATEGORIES_LIST_API), {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, QUES_CATEGORIES_LIST_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
