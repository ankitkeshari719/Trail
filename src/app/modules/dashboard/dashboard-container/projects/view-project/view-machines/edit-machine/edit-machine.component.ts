import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import {
  CommonList,
  InternalResponse,
  INTERNAL_RESPONSE_STATUS,
  Machine
} from "src/app/services";
import { ToastrService } from "ngx-toastr";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MachineService } from "src/app/modules/machine/machine.service";
import { PlatformService } from "src/app/modules/platform";
import { DashboardService } from "src/app/modules/dashboard/dashboard.service";
import { PlantService } from "src/app/modules/plant";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-edit-machine",
  templateUrl: "./edit-machine.component.html",
  styleUrls: ["../../../../../../style.css"]
})
export class EditMachineComponent implements OnInit {
  isLoading: boolean = false;
  machineForm: FormGroup;
  machineList: CommonList[];
  platformList: CommonList[];
  projectList: CommonList[];
  plantList: CommonList[];
  modelList: CommonList[];

  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditMachineComponent>,
    private formBuilder: FormBuilder,
    private machineService: MachineService,
    private platformService: PlatformService,
    private dashboardService: DashboardService,
    private plantService: PlantService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getPlatformList();
    this.createForm();
  }

  createForm() {
    this.machineForm = this.formBuilder.group({
      machineName: [
        { value: this.data.machineName, disabled: true },
        Validators.required
      ],
      modelId: ["", Validators.required],
      platformId: ["", Validators.required],
      plantId: ["", Validators.required],
      targetHours: ["", Validators.required],
      active: [false]
    });
  }

  /**
   * Gets Platform List
   */
  getPlatformList() {
    this.isLoading = true;
    this.platformService.getPlatformList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.platformList = response.success_data.platforms;
          this.getPlantList();
        } else {
          this.dialogRef.close();
          this.isLoading = false;
          response.code != 401 &&
            this.toastr.error(response.error_message, "ERROR");
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
        this.isLoading = false;
      }
    );
  }

  /**
   * Gets plant list
   */
  getPlantList() {
    this.plantService.getPlantList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.plantList = response.success_data.plants;
          this.getModelList();
        } else {
          this.dialogRef.close();
          this.isLoading = false;
          response.code != 401 &&
            this.toastr.error(response.error_message, "ERROR");
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
        this.isLoading = false;
      }
    );
  }

  getModelList() {
    this.machineService.getModelList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.modelList = response.success_data.models;
          this.patchFormValue();
        } else {
          this.dialogRef.close();
          this.isLoading = false;
          response.code != 401 &&
            this.toastr.error(response.error_message, "ERROR");
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
        this.isLoading = false;
      }
    );
  }

  patchFormValue() {
    this.machineForm.setValue({
      machineName: this.data.machineName,
      modelId: this.data.modelId,
      platformId: this.data.platformId,
      targetHours: this.data.targetHours,
      active: this.data.active,
      plantId: this.data.plantId
    });
    this.isLoading = false;
  }

  /**
   * Edits Machine
   * @param updatedMachineData
   */
  editMachine(updatedMachineData: Machine, formDirective: FormGroupDirective) {
    this.isLoading = true;
    updatedMachineData.projectMachineId = this.data.projectMachineId;
    updatedMachineData.vin = this.data.vin;
    updatedMachineData.machineName = this.data.machineName;
    this.dashboardService.editProjectMachine(updatedMachineData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.machineForm.reset();
    formDirective.resetForm();
  }

  getMachineNameError() {
    return this.machineForm.get("machineName").hasError("required")
      ? "Machine Name is required"
      : "";
  }

  getPlatformError() {
    return this.machineForm.get("platformId").hasError("required")
      ? "Platform is required"
      : "";
  }

  getPlantError() {
    return this.machineForm.get("plantId").hasError("required")
      ? "Plant is required"
      : "";
  }

  getModelError() {
    return this.machineForm.get("modelId").hasError("required")
      ? "Model is required"
      : "";
  }
  getTargetHoursError() {
    return this.machineForm.get("targetHours").hasError("required")
      ? "Target Hours is required"
      : "";
  }

  getVinError() {
    return this.machineForm.get("vin").hasError("required")
      ? "VIN is required"
      : "";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
