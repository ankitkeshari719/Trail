import { Component, OnInit } from "@angular/core";
import { CommonsService } from "../../commons.service";
import { ToastrService } from "ngx-toastr";
import { InternalResponse, DriverSheetSubmittedAns } from "src/app/services";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-driver-sheet-submitted-ans",
  templateUrl: "./driver-sheet-submitted-ans.component.html",
  styleUrls: ["../../style.css"]
})
export class DriverSheetSubmittedAnsComponent implements OnInit {
  isLoadingResults: boolean = false;

  constructor(
    private commonsService: CommonsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  /**
   * Gets Driver Sheets submitted Answer details
   * @param driverSheetAnsweredId
   */
  getDS_SubmittedAns(driverSheetAnsweredId: string) {
    driverSheetAnsweredId = "DSSA00";
    this.isLoadingResults = true;
    this.commonsService.getDS_SubmittedAns(driverSheetAnsweredId).subscribe(
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
   * Adds new Driver Sheet submitted Answer
   * @param newDS_SubmittedData
   */
  addNewDS_Submitted(newDS_SubmittedAnsData: DriverSheetSubmittedAns) {
    newDS_SubmittedAnsData = {
      answer: "This is the answer",
      comment: "Approve",
      driverSheetQuestionId: "DSQ01",
      driverSheetSubmittedId: "DSS01"
    };
    this.isLoadingResults = true;
    this.commonsService.addNewDS_SubmittedAns(newDS_SubmittedAnsData).subscribe(
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
   * Edits Driver Sheet Submitted Answer
   * @param updatedDS_SubmittedAnsData
   */
  editDS_SubmittedAns(updatedDS_SubmittedAnsData: DriverSheetSubmittedAns) {
    updatedDS_SubmittedAnsData = {
      driverSheetAnsweredId: "DSSA00",
      driverSheetSubmittedId: "DSS01",
      driverSheetQuestionId: "DSQ01",
      answer: "This is the edited answer",
      comment: "Approve"
    };
    this.isLoadingResults = true;
    this.commonsService
      .editDS_SubmittedAns(updatedDS_SubmittedAnsData)
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
   * Deletes Driver Sheet Submitted Answer
   * @param driverSheetAnsweredId
   */
  deleteDS_SubmittedAns(driverSheetAnsweredId: string) {
    driverSheetAnsweredId = "DSSA01";
    this.isLoadingResults = true;
    this.commonsService.deleteDS_SubmittedAns(driverSheetAnsweredId).subscribe(
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
