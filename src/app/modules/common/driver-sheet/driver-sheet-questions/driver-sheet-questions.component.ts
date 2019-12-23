import { Component, OnInit } from "@angular/core";
import { CommonsService } from "../../commons.service";
import { ToastrService } from "ngx-toastr";
import { InternalResponse, DriverSheetQuestion } from "src/app/services";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-driver-sheet-questions",
  templateUrl: "./driver-sheet-questions.component.html",
  styleUrls: ["../../style.css"]
})
export class DriverSheetQuestionsComponent implements OnInit {
  isLoadingResults: boolean = false;

  constructor(
    private commonsService: CommonsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  /**
   * Gets driver sheet question details
   * @param driverSheetQuestionId
   */
  getDriverSheetQuestionDetails(driverSheetQuestionId: string) {
    driverSheetQuestionId = "DS00";
    // Get the Device Id from params
    this.isLoadingResults = true;
    this.commonsService
      .getDriverSheetQuestionDetails(driverSheetQuestionId)
      .subscribe(
        response => {
          let responseData: InternalResponse = response;
          handleResponse(responseData, this.toastr);
          this.isLoadingResults = false;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
  }

  /**
   * Adds new driver sheet question
   * @param newDriverSheetQuestionData
   */
  addNewDriverSheetQuestion(newDriverSheetQuestionData: DriverSheetQuestion) {
    newDriverSheetQuestionData = {
      active: false,
      driverSheetId: "DS01",
      questionId: "Q01"
    };
    this.isLoadingResults = true;
    this.commonsService
      .addNewDriverSheetQuestion(newDriverSheetQuestionData)
      .subscribe(
        response => {
          let responseData: InternalResponse = response;
          handleResponse(responseData, this.toastr);
          this.isLoadingResults = false;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
  }

  /**
   * Edits driver sheet question
   * @param updatedDriverSheetQuestionData
   */
  editDriverSheetQuestion(updatedDriverSheetQuestionData: DriverSheetQuestion) {
    updatedDriverSheetQuestionData = {
      driverSheetQuestionId: "",
      active: false,
      driverSheetId: "DS01",
      questionId: "Q01"
    };
    this.isLoadingResults = true;
    this.commonsService
      .editDriverSheetQuestion(updatedDriverSheetQuestionData)
      .subscribe(
        response => {
          let responseData: InternalResponse = response;
          handleResponse(responseData, this.toastr);
          this.isLoadingResults = false;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
  }

  /**
   * Deletes driver sheet question
   * @param driverSheetQuestionId
   */
  deleteDriverSheetQuestion(driverSheetQuestionId: string) {
    driverSheetQuestionId = "DS03";
    this.isLoadingResults = true;
    // Get the Device Id from params
    this.commonsService
      .deleteDriverSheetQuestion(driverSheetQuestionId)
      .subscribe(
        response => {
          let responseData: InternalResponse = response;
          handleResponse(responseData, this.toastr);
          this.isLoadingResults = false;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
  }
}
