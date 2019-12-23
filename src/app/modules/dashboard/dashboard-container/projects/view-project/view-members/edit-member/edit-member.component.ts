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
  ProjectUser
} from "src/app/services";
import { ToastrService } from "ngx-toastr";
import { PlantService } from "src/app/modules/plant";
import { DashboardService } from "src/app/modules/dashboard/dashboard.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GET_USER_ROLES } from "src/app/config/backend.api.urls";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-edit-member",
  templateUrl: "./edit-member.component.html",
  styleUrls: ["../../../../../../style.css"]
})
export class EditMemberComponent implements OnInit {
  isLoading: boolean = false;
  userForm: FormGroup;
  projectList: CommonList[];
  plantList: CommonList[];
  roleList: CommonList[];

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private plantService: PlantService,
    private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<EditMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getRoleList();
    this.createForm();
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      assignedUserName: [
        { value: this.data.assignedUserName, disabled: true },
        ,
        Validators.required
      ],
      role: ["", Validators.required],
      plantId: ["", Validators.required],
      mobileNumber: ["", Validators.required],
      active: [false]
    });
  }

  getRoleList() {
    this.isLoading = true;
    this.dashboardService.getDashboardData(GET_USER_ROLES).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.roleList = response.success_data.roles;
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
        this.dialogRef.close();
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
        this.dialogRef.close();
      }
    );
  }

  patchFormValue() {
    this.userForm.setValue({
      assignedUserName: this.data.assignedUserName,
      role: this.data.role,
      mobileNumber: this.data.mobileNumber,
      active: this.data.active,
      plantId: this.data.plantId
    });
    this.isLoading = false;
  }

  /**
   * Edits Machine
   * @param updatedMachineData
   */
  editUser(updatedUserData: ProjectUser, formDirective: FormGroupDirective) {
    this.isLoading = true;
    updatedUserData.projectId = this.data.projectId;
    updatedUserData.projectUserId = this.data.projectUserId;
    updatedUserData.assignedUserName = this.data.assignedUserName;
    updatedUserData.responsibility = "N/A";
    this.dashboardService.editProjectUser(updatedUserData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.userForm.reset();
    formDirective.resetForm();
  }

  getUserNameError() {
    return this.userForm.get("assignedUserName").hasError("required")
      ? "Machine Name is required"
      : "";
  }

  getRoleError() {
    return this.userForm.get("role").hasError("required")
      ? "Platform is required"
      : "";
  }

  getPlantError() {
    return this.userForm.get("plantId").hasError("required")
      ? "Plant is required"
      : "";
  }

  getMobileNumberError() {
    return this.userForm.get("mobileNumber").hasError("required")
      ? "Target Hours is required"
      : "";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
