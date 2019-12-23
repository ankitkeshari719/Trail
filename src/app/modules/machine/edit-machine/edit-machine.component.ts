import { PlantService } from "./../../plant/plant.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import {
  Machine,
  CommonList,
  InternalResponse,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { DashboardService } from "../../dashboard/dashboard.service";
import { MachineService } from "../machine.service";
import { PlatformService } from "../../platform/platform.service";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-edit-machine",
  templateUrl: "./edit-machine.component.html",
  styleUrls: ["../../style.css"]
})
export class EditMachineComponent implements OnInit {
  isLoading: boolean = false;
  machineForm: FormGroup;
  selectedMachineId: string;
  selectedMachinedata: Machine;
  machineList: CommonList[];
  platformList: CommonList[];
  projectList: CommonList[];
  plantList: CommonList[];
  modelList: CommonList[];
  enableEdit: boolean = false;
  enableDelete: boolean = false;
  info_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private machineService: MachineService,
    private platformService: PlatformService,
    private plantService: PlantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.router.url.includes("delete")) {
      this.dashboardService.setTitle("Delete Machine");
      this.enableEdit = true;
    } else {
      this.enableDelete = true;
      this.dashboardService.setTitle("Edit Machine");
    }
    this.getMachineNameList();
    this.getModelList();
    this.createForm();
  }

  createForm() {
    this.machineForm = this.formBuilder.group({
      machineName: ["", Validators.required],
      modelId: ["", Validators.required],
      projectId: ["", Validators.required],
      platformId: ["", Validators.required],
      plantId: ["", Validators.required]
    });
  }

  /**
   * Gets Machine name list
   */
  getMachineNameList() {
    this.isLoading = true;
    this.machineService.getMachineList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.machineList = response.success_data.machines;
          this.getPlatformList();
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  /**
   * Gets Platform List
   */
  getPlatformList() {
    this.platformService.getPlatformList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.platformList = response.success_data.platforms;
          this.getPlantList();
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
          this.getProjectList();
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
   * Gets Project list
   */
  getProjectList() {
    this.dashboardService.getProjectList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.projectList = response.success_data.projects;
          this.isLoading = false;
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
    this.isLoading = true;
    this.machineService.getModelList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.modelList = response.success_data.models;
          this.isLoading = false;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
        this.isLoading = false;
      }
    );
  }

  onMachineChange(templateId: any): void {
    this.isLoading = true;
    this.selectedMachineId = templateId;
    this.getMachineDetails(this.selectedMachineId);
  }

  /**
   * Gets Machine details
   * @param selectedMachineId
   */
  getMachineDetails(selectedMachineId: string) {
    this.isLoading = true;
    this.machineService.getMachineDetails(selectedMachineId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.selectedMachinedata = responseData.success_data;
          this.patchFormValue(this.selectedMachinedata);
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

  patchFormValue(machinesData: Machine) {
    this.machineForm.setValue({
      machineName: machinesData.machineName,
      modelId: machinesData.modelId,
      platformId: machinesData.platformId,
      plantId: machinesData.plantId,
      projectId: machinesData.projectId
    });
    this.isLoading = false;
  }

  onSubmit(updatedMachineData: Machine, formDirective: FormGroupDirective) {
    if (!this.enableEdit) {
      this.editMachine(updatedMachineData, formDirective);
    } else {
      this.deleteMachine(formDirective);
    }
  }
  /**
   * Edits Machine
   * @param updatedMachineData
   */
  editMachine(updatedMachineData: Machine, formDirective: FormGroupDirective) {
    this.isLoading = true;
    updatedMachineData.vin = this.selectedMachineId;
    this.machineService.editMachine(updatedMachineData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.selectedMachineId = null;
        this.getMachineNameList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.machineForm.reset();
    formDirective.resetForm();
  }

  /**
   * Deletes Machine
   * @param formDirective
   */
  deleteMachine(formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.machineService.deleteMachine(this.selectedMachineId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.selectedMachineId = null;
        this.getMachineNameList();
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

  getProjectError() {
    return this.machineForm.get("projectId").hasError("required")
      ? "Project is required"
      : "";
  }

  getModelError() {
    return this.machineForm.get("modelId").hasError("required")
      ? "Model is required"
      : "";
  }

  getVinError() {
    return this.machineForm.get("vin").hasError("required")
      ? "VIN is required"
      : "";
  }

  // Function execute on Add button Click
  onClickAdd() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  // Function execute on Add button Click
  onClickEdit() {
    this.router.navigate(["../edit-machine"], { relativeTo: this.route });
  }

  // Function execute on Add button Click
  onClickDelete() {
    this.router.navigate(["../delete-machine"], { relativeTo: this.route });
  }

  backToDashboard() {
    this.router.navigate(["./dashboard"]);
  }
}
