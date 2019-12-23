import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import {
  Platform,
  CommonList,
  InternalResponse,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DashboardService } from "../dashboard/dashboard.service";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";
import { PlatformService } from "./platform.service";

@Component({
  selector: "app-platform",
  templateUrl: "./platform.component.html",
  styleUrls: ["../style.css"]
})
export class PlatformComponent implements OnInit {
  isLoading: boolean = false;
  platformForm: FormGroup;
  selectedPlatformId: string;
  selectedPlatformdata: Platform;
  platformList: CommonList[];
  enableEdit: boolean = false;
  enableDelete: boolean = false;
  info_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dashboardService: DashboardService,
    private platformService: PlatformService
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("Add New Platform");
    this.createForm();
  }

  createForm() {
    this.platformForm = this.formBuilder.group({
      platformName: ["", Validators.required],
      description: ["", Validators.required],
      imageUrl: ["", Validators.required],
      active: [false]
    });
  }

  // Function execute on Add button Click
  onClickAdd() {
    this.dashboardService.setTitle("Add New Platform");
    this.enableEdit = false;
    this.enableDelete = false;
    this.platformForm.reset();
  }

  // Function execute on Edit button Click
  onClickEdit() {
    this.dashboardService.setTitle("Edit Platform");
    this.enableEdit = true;
    this.selectedPlatformId = null;
    this.platformForm.reset();
    this.getPlatformNameList();
  }

  // Function execute on Delete button Click
  onClickDelete() {
    this.dashboardService.setTitle("Delete Platform");
    this.enableEdit = false;
    this.enableDelete = true;
    this.selectedPlatformId = null;
    this.platformForm.reset();
    this.getPlatformNameList();
  }

  onPlatformChange(templateId: any): void {
    this.isLoading = true;
    this.selectedPlatformId = templateId;
    this.getPlatformDetails(this.selectedPlatformId);
  }

  patchFormValue(platformData: Platform) {
    this.platformForm.setValue({
      platformName: platformData.platformName,
      description: platformData.description,
      imageUrl: platformData.imageUrl,
      active: platformData.active
    });
    this.isLoading = false;
  }

  onSubmit(newPlatformData: Platform, formDirective: FormGroupDirective) {
    if (!this.enableEdit && this.enableDelete) {
      this.deletePlatform(formDirective);
    } else if (this.enableEdit) {
      this.editPlatform(newPlatformData, formDirective);
    } else {
      this.addNewPlatform(newPlatformData, formDirective);
    }
  }

  getPlatformNameList() {
    this.platformService.getPlatformList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.platformList = response.success_data.platforms;
          this.createForm();
          this.isLoading = false;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  getPlatformDetails(selectedPlatformId: string) {
    this.isLoading = true;
    this.platformService.getPlatformDetails(selectedPlatformId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.selectedPlatformdata = responseData.success_data;
          this.patchFormValue(this.selectedPlatformdata);
        } else {
          response.code != 401 &&
            this.toastr.error(response.error_message, "ERROR");
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  /**
   * Adds new Platform
   * @param newPlatformData
   */
  addNewPlatform(newPlatformData: Platform, formDirective: FormGroupDirective) {
    newPlatformData.imageUrl =
      "https://s3-ap-south-1.amazonaws.com/linkecoservice-store-dev/excavator.jpg";
    this.isLoading = true;
    this.platformService.addNewPlatform(newPlatformData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.platformForm.reset();
    formDirective.resetForm();
  }

  /**
   * Edits Platform
   * @param updatedPlatformData
   */
  editPlatform(
    updatedPlatformData: Platform,
    formDirective: FormGroupDirective
  ) {
    this.isLoading = true;
    updatedPlatformData.platformId = this.selectedPlatformId;
    this.platformService.editPlatform(updatedPlatformData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.selectedPlatformId = null;
        this.getPlatformNameList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.platformForm.reset();
    formDirective.resetForm();
  }

  /**
   * Deletes Platform
   * @param formDirective
   */
  deletePlatform(formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.platformService.deletePlatform(this.selectedPlatformId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.selectedPlatformId = null;
        this.getPlatformNameList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.platformForm.reset();
    formDirective.resetForm();
  }

  getPlatformNameError() {
    return this.platformForm.get("platformName").hasError("required")
      ? "Platform Name is required"
      : "";
  }

  getDescriptionError() {
    return this.platformForm.get("description").hasError("required")
      ? "Description is required"
      : "";
  }

  backToDashboard() {
    this.router.navigate(["./dashboard"]);
  }
}
