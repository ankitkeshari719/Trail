import { Component, OnInit } from "@angular/core";
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
  Device
} from "src/app/services";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DashboardService } from "../../dashboard/dashboard.service";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";
import { DeviceService } from "../device.service";

@Component({
  selector: "app-device-operation",
  templateUrl: "./device-operation.component.html",
  styleUrls: ["../../style.css"]
})
export class DeviceOperationComponent implements OnInit {
  isLoading: boolean = false;
  deviceForm: FormGroup;
  selectedDeviceId: string;
  selectedDevicedata: Device;
  enableEdit: boolean = false;
  enableDelete: boolean = false;
  deviceList: CommonList[];
  info_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dashboardService: DashboardService,
    private deviceService: DeviceService
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("Add New Device");
    this.createForm();
  }

  createForm() {
    this.deviceForm = this.formBuilder.group({
      deviceName: ["", Validators.required],
      identificationKeys: ["", Validators.required],
      oS: ["", Validators.required],
      active: [false],
      installed: [false]
    });
  }

  // Function execute on Add button Click
  onClickAdd() {
    this.dashboardService.setTitle("Add New Device");
    this.enableEdit = false;
    this.enableDelete = false;
    this.deviceForm.reset();
  }

  // Function execute on Edit button Click
  onClickEdit() {
    this.dashboardService.setTitle("Edit Device");
    this.enableEdit = true;
    this.selectedDeviceId = null;
    this.deviceForm.reset();
    this.getDeviceNameList();
  }

  // Function execute on Delete button Click
  onClickDelete() {
    this.dashboardService.setTitle("Delete Device");
    this.enableEdit = false;
    this.enableDelete = true;
    this.selectedDeviceId = null;
    this.deviceForm.reset();
    this.getDeviceNameList();
  }

  onDeviceChange(templateId: any): void {
    this.isLoading = true;
    this.selectedDeviceId = templateId;
    this.getDeviceDetails(this.selectedDeviceId);
  }

  patchFormValue(deviceData: Device) {
    this.deviceForm.setValue({
      deviceName: deviceData.deviceName,
      identificationKeys: deviceData.identificationKeys,
      oS: deviceData.oS,
      active: deviceData.active,
      installed: deviceData.installed
    });
    this.isLoading = false;
  }

  onSubmit(newDeviceData: Device, formDirective: FormGroupDirective) {
    if (!this.enableEdit && this.enableDelete) {
      this.deleteDevice(formDirective);
    } else if (this.enableEdit) {
      this.editDevice(newDeviceData, formDirective);
    } else {
      this.addNewDevice(newDeviceData, formDirective);
    }
  }

  getDeviceNameList() {
    this.deviceService.getDeviceList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.deviceList = response.success_data.devices;
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

  getDeviceDetails(selectedDeviceId: string) {
    this.isLoading = true;
    this.deviceService.getDeviceDetails(selectedDeviceId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.selectedDevicedata = responseData.success_data;
          this.patchFormValue(this.selectedDevicedata);
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
   * Adds new device
   * @param newDeviceData
   */
  addNewDevice(newDeviceData: Device, formDirective: FormGroupDirective) {
    this.isLoading = true;
    newDeviceData.deviceId = "D0" + Math.floor(Math.random() * 10);
    this.deviceService.addNewDevice(newDeviceData).subscribe(
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
    this.deviceForm.reset();
    formDirective.resetForm();
  }

  /**
   * Edits device
   * @param updatedDeviceData
   */
  editDevice(updatedDeviceData: Device, formDirective: FormGroupDirective) {
    this.isLoading = true;
    updatedDeviceData.deviceId = this.selectedDeviceId;
    this.deviceService.editDevice(updatedDeviceData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.selectedDeviceId = null;
        this.getDeviceNameList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.deviceForm.reset();
    formDirective.resetForm();
  }

  /**
   * Deletes device
   * @param formDirective
   */
  deleteDevice(formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.deviceService.deleteDevice(this.selectedDeviceId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.selectedDeviceId = null;
        this.getDeviceNameList();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.deviceForm.reset();
    formDirective.resetForm();
  }

  getDeviceError() {
    return this.deviceForm.get("deviceName").hasError("required")
      ? "Device Name is required"
      : "";
  }

  getIdentificationKeysError() {
    return this.deviceForm.get("identificationKeys").hasError("required")
      ? "Identification Keys is required"
      : "";
  }

  getOsError() {
    return this.deviceForm.get("deviceName").hasError("required")
      ? "Operating System is required"
      : "";
  }

  backToDashboard() {
    this.router.navigate(["./dashboard"]);
  }
}
