import { Injectable } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import {
  createUrl,
  getHeader,
  handleError,
  modifyResponse,
  Question
} from "src/app/services";
import {
  QUESTIONS_API,
  QUESTIONS_LIST_API,
  QUESTIONS_NAME_LIST
} from "src/app/config/backend.api.urls";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class QuestionBankService {
  constructor(private http: HttpClient) {}

  /*************************************QUESTION'S********************************/
  /**
   * Gets question details
   * @param questionId
   * @returns
   */
  getQuestionDetails(questionId: string) {
    const params = new HttpParams().set("questionId", questionId);
    return this.http
      .get(createUrl(QUESTIONS_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, QUESTIONS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Adds new question
   * @param newQuestionData
   * @returns
   */
  addNewQuestion(newQuestionData: Question) {
    return this.http
      .post(createUrl(QUESTIONS_API), newQuestionData, {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, QUESTIONS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Edits question
   * @param updatedQuestionData
   * @returns
   */
  editQuestion(updatedQuestionData: Question) {
    const params = new HttpParams()
      .set("questionId", updatedQuestionData.questionId)
      .set("question", updatedQuestionData.question)
      .set("description", updatedQuestionData.description)
      .set("questionCategoryId", updatedQuestionData.questionCategoryId)
      .set("questionType", updatedQuestionData.questionType)
      .set("visibility", updatedQuestionData.visibility.toString())
      .set("active", updatedQuestionData.active.toString());
    return this.http
      .put(createUrl(QUESTIONS_API), updatedQuestionData, {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, QUESTIONS_API);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }

  /**
   * Deletes question
   * @param questionId
   * @returns
   */
  deleteQuestion(questionId: string) {
    const params = new HttpParams().set("questionId", questionId);
    return this.http
      .delete(createUrl(QUESTIONS_API), {
        headers: getHeader(),
        params: params
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, QUESTIONS_API);
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
   * Gets question list
   * @param categoryId
   * @returns
   */
  getQuestionNameList() {
    return this.http
      .get(createUrl(QUESTIONS_NAME_LIST), {
        headers: getHeader()
      })
      .pipe(
        catchError((unauthorizedResponse: any) => {
          return handleError(unauthorizedResponse, QUESTIONS_NAME_LIST);
        }),
        map(response => {
          return modifyResponse(response);
        })
      );
  }
}
