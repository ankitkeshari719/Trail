import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { CommonsService } from "../commons.service";
import { InternalResponse, DriverSheet } from "src/app/services";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-driver-sheet",
  templateUrl: "./driver-sheet.component.html",
  styleUrls: ["../style.css"]
})
export class DriverSheetComponent implements OnInit {
  isLoadingResults: boolean = true;

  constructor(
    private commonsService: CommonsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  /**
   * Gets driver sheet details
   * @param driverSheetId
   */
  getDriverSheetDetails(driverSheetId: string) {
    driverSheetId = "DS00";
    // Get the Device Id from params
    this.isLoadingResults = true;
    this.commonsService.getDriverSheetDetails(driverSheetId).subscribe(
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
   * Adds new driver sheet
   * @param newDriverSheetData
   */
  addNewDriverSheet(newDriverSheetData: DriverSheet) {
    newDriverSheetData = {
      active: false,
      current: false,
      description: "Lorem Epsum is a ....",
      driverSheetName: "Lorem Epsum",
      projectId: "P910"
    };
    this.isLoadingResults = true;
    this.commonsService.addNewDriverSheet(newDriverSheetData).subscribe(
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
   * Edits driver sheet
   * @param updatedDriverSheetData
   */
  editDriverSheet(updatedDriverSheetData: DriverSheet) {
    updatedDriverSheetData = {
      driverSheetId: "DS00",
      active: false,
      current: false,
      description: "Lorem Epsum is a testing content",
      driverSheetName: "Lorem Epsum",
      projectId: "P910"
    };
    this.isLoadingResults = true;
    this.commonsService.editDriverSheet(updatedDriverSheetData).subscribe(
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
   * Deletes driver sheet
   * @param driverSheetId
   */
  deleteDriverSheet(driverSheetId: string) {
    driverSheetId = "DS03";
    // Get the Device Id from params
    this.isLoadingResults = true;
    this.commonsService.deleteDriverSheet(driverSheetId).subscribe(
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
