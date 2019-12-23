import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "src/app/modules/auth/auth.service";
import { UpdateUserService } from "./../update-user.service";
import { DashboardService } from "../../dashboard/dashboard.service";
import { emailregex } from "src/app/config/const";
import { GET_USER_LIST, GET_USER_ROLES } from "src/app/config/backend.api.urls";
import {
  UserProfileDetails,
  InternalResponse,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-update-user-profile",
  templateUrl: "./update-user-profile.component.html",
  styleUrls: ["../../style.css"]
})
export class UpdateUserProfileComponent implements OnInit {
  hide = true;
  isLoading: boolean = false;
  registerForm: FormGroup;
  userlist: any;
  roles: any;
  selectedUserId: string;
  selectedUserdata: UserProfileDetails;
  locations: { id: string; name: string }[];
  info_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private updateUserService: UpdateUserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("Update User Profile");
    this.getUserList();
    this.createForm();
  }

  getUserList() {
    this.isLoading = true;
    this.dashboardService.getDashboardData(GET_USER_LIST).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.userlist = response.success_data.users;
          this.getLocations();
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

  getLocations() {
    this.authService.getLocation().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.locations = response.success_data.locations;
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
    this.registerForm = this.formBuilder.group({
      userEmail: [null, [Validators.required, Validators.pattern(emailregex)]],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      address: [null, [Validators.required]],
      roleId: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      country: ["India", [Validators.required]],
      active: [false]
    });
  }

  getErrorFirstName() {
    return this.registerForm.get("firstName").hasError("required")
      ? "First Name is required."
      : this.registerForm.get("firstName").hasError("minlength")
      ? "Minimum 3 character required."
      : "";
  }

  getErrorLastName() {
    return this.registerForm.get("lastName").hasError("required")
      ? "Last Name is required."
      : this.registerForm.get("lastName").hasError("minlength")
      ? "Minimum 3 character required."
      : "";
  }

  getErrorEmail() {
    return this.registerForm.get("userEmail").hasError("required")
      ? "Email is required."
      : this.registerForm.get("userEmail").hasError("pattern")
      ? "Not a valid email address (domain must be jcb.com)."
      : "";
  }

  getLoationError() {
    return this.registerForm.get("address").hasError("required")
      ? "Address is required"
      : "";
  }

  getRoleError() {
    return this.registerForm.get("roleId").hasError("required")
      ? "Role is required"
      : "";
  }

  getCountryError() {
    return this.registerForm.get("country").hasError("required")
      ? "Country is required"
      : "";
  }

  /**
   * Get User details on selection
   * @param userId
   */
  onUserSelection(userId: string) {
    this.selectedUserId = userId;
    this.updateUserService.getUserDetails(userId).subscribe(userData => {
      this.selectedUserdata = userData.success_data
        ? userData.success_data
        : "";
      this.setData(this.selectedUserdata);
    });
  }

  setData(userdata: UserProfileDetails) {
    let role = this.roles.filter(function(el) {
      return el.name === userdata.roleName;
    });

    let address = this.locations.filter(function(el) {
      return el.name === userdata.address;
    });
    this.registerForm.patchValue({
      userEmail: userdata.email,
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      country: userdata.country,
      active: userdata.active,
      phoneNumber: userdata.phoneNumber,
      roleId: role.length > 0 && role[0].id,
      address: address.length > 0 && address[0].id
    });
  }

  /**
   * REGISTER NEW USER THROUGH TEST ENGINEER
   * @param reqDetails OLDS THE DATA FOR  REGISTER REQUEST
   * @returns  SUCCESSFUL / FAILED MESSAGE RESPONSE
   */
  onSubmit(reqDetails: any, formDirective: FormGroupDirective) {
    if (!this.registerForm.valid) {
      return;
    }
    let address = this.locations.filter(function(el) {
      return el.id === reqDetails.address;
    });
    reqDetails.address = address.length > 0 && address[0].name;
    reqDetails.userId = this.selectedUserId;
    reqDetails.smsLanguage = this.selectedUserdata.smsLanguage;
    reqDetails.image = "abc.png";
    this.isLoading = true;
    this.updateUserService.updateUserDetail(reqDetails).subscribe(
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
    this.selectedUserId = null;
    formDirective.resetForm();
    this.registerForm.reset();
  }

  backToDashboard() {
    this.router.navigate(["./dashboard"]);
  }
}
