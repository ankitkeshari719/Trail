import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  InternalResponse,
  DriverSheetSubmitted
} from "src/app/services";
import { HttpErrorResponse } from "@angular/common/http";
import { CommonsService } from "../../commons.service";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-driver-sheet-submitted",
  templateUrl: "./driver-sheet-submitted.component.html",
  styleUrls: ["../../style.css"]
})
export class DriverSheetSubmittedComponent implements OnInit {
  isLoadingResults: boolean = false;

  constructor(
    private commonsService: CommonsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  /**
   * Gets Driver Sheets submitted details
   * @param driverSheetSubmittedId
   */
  getDS_SubmittedDetails(driverSheetSubmittedId: string) {
    driverSheetSubmittedId = "DSS01";
    this.isLoadingResults = true;
    // Get the Device Id from params
    this.commonsService.getDS_Submitted(driverSheetSubmittedId).subscribe(
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
   * Adds new Driver Sheet submitted
   * @param newDS_SubmittedData
   */
  addNewDS_Submitted(newDS_SubmittedData: DriverSheetSubmitted) {
    newDS_SubmittedData = {
      active: false,
      deviceId: "D01",
      driverSheetId: "DS01",
      endHours: 12,
      inProgress: false,
      language: "English/Hindi",
      projectMachineId: "PM01",
      shiftId: "S01",
      startHours: 10,
      testingHoursCompleted: 20,
      userId: "leho000"
    };
    this.isLoadingResults = true;
    this.commonsService.addNewDS_Submitted(newDS_SubmittedData).subscribe(
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

  editDS_Submitted(updatedDS_dData: DriverSheetSubmitted) {
    updatedDS_dData = {
      driverSheetSubmittedId: "DSS00",
      driverSheetId: "DS01",
      projectMachineId: "PM01",
      userId: "anke30",
      shiftId: "S01",
      deviceId: "D01",
      language: "English/Hindi",
      inProgress: false,
      startHours: 10,
      endHours: 12,
      testingHoursCompleted: 20,
      active: false
    };
    this.isLoadingResults = true;
    this.commonsService.editDS_Submitted(updatedDS_dData).subscribe(
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
  deleteDS_Submitted(driverSheetQuestionId: string) {
    driverSheetQuestionId = "DSS01";
    // Get the Device Id from params
    this.isLoadingResults = true;
    this.commonsService.deleteDS_Submitted(driverSheetQuestionId).subscribe(
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
