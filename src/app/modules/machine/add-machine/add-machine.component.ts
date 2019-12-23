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
  selector: "app-add-machine",
  templateUrl: "./add-machine.component.html",
  styleUrls: ["../../style.css"]
})
export class AddMachineComponent implements OnInit {
  isLoading: boolean = false;
  machineForm: FormGroup;
  platformList: CommonList[];
  modelList: CommonList[];
  info_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private machineService: MachineService,
    private platformService: PlatformService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("Add New Machine");
    this.getPlatformList();
    this.getModelList();
    this.createForm();
  }

  createForm() {
    this.machineForm = this.formBuilder.group({
      machineName: ["", Validators.required],
      modelId: ["", Validators.required],
      platformId: ["", Validators.required],
      vin: ["", Validators.required]
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
        console.log(response);
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

  // Function execute on Edit button Click
  onClickEdit() {
    this.router.navigate(["edit-machine"], { relativeTo: this.route });
  }

  // Function execute on Delete button Click
  onClickDelete() {
    this.router.navigate(["delete-machine"], { relativeTo: this.route });
  }

  /**
   * Adds new Machine
   * @param newMachineData
   */
  addNewMachine(newMachineData: Machine, formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.machineService.addNewMachine(newMachineData).subscribe(
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

  backToDashboard() {
    this.router.navigate(["./dashboard"]);
  }
}
