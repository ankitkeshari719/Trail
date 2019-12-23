import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import {
  Plants,
  CommonList,
  InternalResponse,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DashboardService } from "../dashboard/dashboard.service";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";
import { PlantService } from "./plant.service";
import { emailregex } from "src/app/config/const";

@Component({
  selector: "app-plant",
  templateUrl: "./plant.component.html",
  styleUrls: ["../style.css"]
})
export class PlantComponent implements OnInit {
  isLoading: boolean = false;
  plantsForm: FormGroup;
  selectedPlantId: string;
  selectedPlantdata: Plants;
  plantList: CommonList[];
  enableEdit: boolean = false;
  enableDelete: boolean = false;
  info_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dashboardService: DashboardService,
    private plantService: PlantService
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("Add New Plant");
    this.createForm();
  }

  createForm() {
    this.plantsForm = this.formBuilder.group({
      plantName: ["", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
      country: ["", Validators.required],
      plantPOCEmail: [
        "",
        [Validators.required, Validators.pattern(emailregex)]
      ],
      plantPOCFName: ["", Validators.required],
      plantPOCLName: ["", Validators.required],
      active: [false]
    });
  }

  // Function execute on Add button Click
  onClickAdd() {
    this.dashboardService.setTitle("Add New Plant");
    this.enableEdit = false;
    this.enableDelete = false;
    this.plantsForm.reset();
  }

  // Function execute on Edit button Click
  onClickEdit() {
    this.dashboardService.setTitle("Edit Plant");
    this.enableEdit = true;
    this.selectedPlantId = null;
    this.plantsForm.reset();
    this.getPlantNameList();
  }

  // Function execute on Delete button Click
  onClickDelete() {
    this.dashboardService.setTitle("Delete Plant");
    this.enableEdit = false;
    this.enableDelete = true;
    this.selectedPlantId = null;
    this.plantsForm.reset();
    this.getPlantNameList();
  }

  onPlantChange(templateId: any): void {
    this.isLoading = true;
    this.selectedPlantId = templateId;
    this.getPlantDetails(this.selectedPlantId);
  }

  patchFormValue(plantsData: Plants) {
    this.plantsForm.setValue({
      plantName: plantsData.plantName,
      city: plantsData.city,
      address: plantsData.address,
      country: plantsData.country,
      plantPOCEmail: plantsData.plantPOCEmail,
      plantPOCFName: plantsData.plantPOCFName,
      plantPOCLName: plantsData.plantPOCLName,
      active: plantsData.active
    });
    this.isLoading = false;
  }

  onSubmit(newPlantData: Plants, formDirective: FormGroupDirective) {
    if (!this.enableEdit && this.enableDelete) {
      this.deletePlant(formDirective);
    } else if (this.enableEdit) {
      this.editPlant(newPlantData, formDirective);
    } else {
      this.addNewPlant(newPlantData, formDirective);
    }
  }

  getPlantNameList() {
    this.plantService.getPlantList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.plantList = response.success_data.plants;
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

  getPlantDetails(selectedPlantId: string) {
    this.isLoading = true;
    this.plantService.getPlantDetails(selectedPlantId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.selectedPlantdata = responseData.success_data;
          this.patchFormValue(this.selectedPlantdata);
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
   * Adds new Plant
   * @param newPlantData
   */
  addNewPlant(newPlantData: Plants, formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.plantService.addNewPlant(newPlantData).subscribe(
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
    this.plantsForm.reset();
    formDirective.resetForm();
  }

  /**
   * Edits Plant
   * @param updatedPlantData
   */
  editPlant(updatedPlantData: Plants, formDirective: FormGroupDirective) {
    this.isLoading = true;
    updatedPlantData.plantId = this.selectedPlantId;
    this.plantService.editPlant(updatedPlantData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.selectedPlantId = null;
        this.getPlantNameList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.plantsForm.reset();
    formDirective.resetForm();
  }

  /**
   * Deletes Plant
   * @param formDirective
   */
  deletePlant(formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.plantService.deletePlant(this.selectedPlantId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.selectedPlantId = null;
        this.getPlantNameList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.plantsForm.reset();
    formDirective.resetForm();
  }

  getPlantNameError() {
    return this.plantsForm.get("plantName").hasError("required")
      ? "Plant Name is required"
      : "";
  }

  getCityError() {
    return this.plantsForm.get("city").hasError("required")
      ? "City is required"
      : "";
  }

  getAddressError() {
    return this.plantsForm.get("address").hasError("required")
      ? "Address is required"
      : "";
  }

  getCountryError() {
    return this.plantsForm.get("country").hasError("required")
      ? "Country is required"
      : "";
  }

  getPlantPOCEmailError() {
    return this.plantsForm.get("plantPOCEmail").hasError("required")
      ? "Plant POC Email is required"
      : this.plantsForm.get("plantPOCEmail").hasError("pattern")
      ? "Not a valid email address (domain must be jcb.com)."
      : "";
  }

  getPlantPOCFNameError() {
    return this.plantsForm.get("plantPOCFName").hasError("required")
      ? "plant POC First Name is required"
      : "";
  }

  getPlantPOCLNameError() {
    return this.plantsForm.get("plantPOCLName").hasError("required")
      ? "Plant POC Last Name is required"
      : "";
  }

  backToDashboard() {
    this.router.navigate(["./dashboard"]);
  }
}
