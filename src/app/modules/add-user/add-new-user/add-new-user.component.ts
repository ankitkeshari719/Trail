import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import { DashboardService } from "./../../dashboard/dashboard.service";
import { emailregex, activateUserUrl } from "src/app/config/const";
import { UserRegistrationRequest, InternalResponse } from "src/app/services";
import { AuthService } from "../../auth/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-new-user",
  templateUrl: "./add-new-user.component.html",
  styleUrls: ["../../style.css"]
})
export class AddNewUserComponent implements OnInit {
  registerForm: FormGroup;
  isLoading: boolean = false;
  info_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("New User Registration");
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]]
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
    return this.registerForm.get("email").hasError("required")
      ? "Email is required."
      : this.registerForm.get("email").hasError("pattern")
      ? "Not a valid email address (domain must be jcb.com)."
      : "";
  }

  /**
   * REGISTER NEW USER THROUGH TEST ENGINEER
   * @param reqDetails OLDS THE DATA FOR  REGISTER REQUEST
   * @returns  SUCCESSFUL / FAILED MESSAGE RESPONSE
   */
  onSubmit(
    reqDetails: UserRegistrationRequest,
    formDirective: FormGroupDirective
  ) {
    if (!this.registerForm.valid) {
      return;
    }
    reqDetails.activateUserUrl = activateUserUrl;
    reqDetails.roleId = "R00";
    reqDetails.selfRegistration = false;
    this.isLoading = true;
    this.authService.registerUser(reqDetails).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
        this.isLoading = false;
      }
    );
    formDirective.resetForm();
    this.registerForm.reset();
  }

  backToDashboard() {
    this.router.navigate(["./dashboard"]);
  }
}
