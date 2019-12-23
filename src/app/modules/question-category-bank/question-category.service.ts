import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";

import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  QuestionCategories
} from "src/app/services";
import {
  QUES_CATEGORIES_API,
  QUES_CATEGORIES_LIST_API
} from "src/app/config/backend.api.urls";

@Injectable({
  providedIn: "root"
})
export class QuestionCategoryService {
  constructor(private http: HttpClient) {}

  /**
   * Gets Question catagory details
   * @param questionId
   * @returns
   */
  getQuesCatagoryDetails(questionCategoryId: string) {
    const params = new HttpParams().set(
      "questionCategoryId",
      questionCategoryId
    );
    return this.http
      .get(createUrl(QUES_CATEGORIES_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, QUES_CATEGORIES_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Adds ques category
   * @param newQuesCategoryData
   * @returns
   */
  addQuesCategory(newQuesCategoryData: QuestionCategories) {
    return this.http
      .post(createUrl(QUES_CATEGORIES_API), newQuesCategoryData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, QUES_CATEGORIES_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Edits Question catagory
   * @param updatedQuesCategoryData
   * @returns
   */
  editQuesCatagory(updatedQuesCategoryData: QuestionCategories) {
    const params = new HttpParams()
      .set("questionCategoryId", updatedQuesCategoryData.questionCategoryId)
      .set("description", updatedQuesCategoryData.description)
      .set("questionCategoryName", updatedQuesCategoryData.questionCategoryName)
      .set("active", updatedQuesCategoryData.active.toString());
    return this.http
      .put(createUrl(QUES_CATEGORIES_API), updatedQuesCategoryData, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, QUES_CATEGORIES_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Deletes Question Catagory
   * @param questionCategoryId
   * @returns
   */
  deleteQuesCatagory(questionCategoryId: string) {
    const params = new HttpParams().set(
      "questionCategoryId",
      questionCategoryId
    );
    return this.http
      .delete(createUrl(QUES_CATEGORIES_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, QUES_CATEGORIES_API);
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
