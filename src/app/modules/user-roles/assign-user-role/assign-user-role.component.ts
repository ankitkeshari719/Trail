import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import { DashboardService } from "../../dashboard/dashboard.service";
import { GET_USER_LIST, GET_USER_ROLES } from "src/app/config/backend.api.urls";
import { UserRolesService } from "../user-roles.service";
import {
  UpdateUserRoleRequest,
  InternalResponse,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";
import { Router } from "@angular/router";

@Component({
  selector: "app-assign-user-role",
  templateUrl: "./assign-user-role.component.html",
  styleUrls: ["../../style.css"]
})
export class AssignUserRoleComponent implements OnInit {
  users: any;
  roles: any;
  isLoading: boolean = false;
  assignUserRoleForm: FormGroup;
  info_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userRolesService: UserRolesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("Update User Role");
    this.getUserList();
    this.createForm();
  }

  getUserList() {
    this.isLoading = true;
    this.dashboardService.getDashboardData(GET_USER_LIST).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.users = response.success_data.users;
          this.getRoleList();
        } else {
          response.code != 401 &&
            this.toastr.error(response.error_message, "ERROR");
          this.isLoading = false;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  getRoleList() {
    this.dashboardService.getDashboardData(GET_USER_ROLES).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.roles = response.success_data.roles;
          this.isLoading = false;
        } else {
          response.code != 401 &&
            this.toastr.error(response.error_message, "ERROR");
          this.isLoading = false;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  createForm() {
    this.assignUserRoleForm = this.formBuilder.group({
      userName: ["", Validators.required],
      roleId: ["", Validators.required]
    });
  }

  getErrorUserName() {
    return this.assignUserRoleForm.get("userName").hasError("required")
      ? "User Name is required."
      : "";
  }

  getErrorRole() {
    return this.assignUserRoleForm.get("roleId").hasError("required")
      ? "Role is required."
      : "";
  }

  onSubmit(data: UpdateUserRoleRequest, formDirective: FormGroupDirective) {
    this.isLoading = true;
    this.userRolesService.updateUserRole(data).subscribe(
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
    formDirective.resetForm();
    this.assignUserRoleForm.reset();
  }

  backToDashboard() {
    this.router.navigate(["./dashboard"]);
  }
}
