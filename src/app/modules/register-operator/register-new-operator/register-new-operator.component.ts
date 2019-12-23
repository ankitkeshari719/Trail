import { handleResponse } from "src/app/config/helper.function";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { DashboardService } from "../../dashboard/dashboard.service";
import { ToastrService } from "ngx-toastr";
import { emailregex } from "src/app/config/const";
import {
  InternalResponse,
  INTERNAL_RESPONSE_STATUS,
  RegisterOperatorRequest,
  CommonList
} from "src/app/services";
import { RegisterOperatorService } from "../register-operator.service";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register-new-operator",
  templateUrl: "./register-new-operator.component.html",
  styleUrls: ["../../style.css"]
})
export class RegisterNewOperatorComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;
  isLoading: boolean = false;
  locations: CommonList[];
  info_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private registerOperatorService: RegisterOperatorService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dashboardService.setTitle("New Operator Registration");
    this.createForm();
    this.getLocations();
  }

  /**
   * Gets locations
   */
  getLocations() {
    this.isLoading = true;
    this.authService.getLocation().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.locations = response.success_data.locations;
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
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      location: [null, [Validators.required]],
      password: [null, [Validators.required]],
      roleName: [{ value: "Operator", disabled: true }, [Validators.required]]
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

  getErrorPassword() {
    return this.registerForm.get("password").hasError("required")
      ? "Password is required"
      : "";
  }

  getLoationError() {
    return this.registerForm.get("location").hasError("required")
      ? "Location is required"
      : "";
  }

  /**
   * REGISTER NEW USER THROUGH TEST ENGINEER
   * @param reqDetails OLDS THE DATA FOR  REGISTER REQUEST
   * @returns  SUCCESSFUL / FAILED MESSAGE RESPONSE
   */
  onSubmit(
    reqDetails: RegisterOperatorRequest,
    formDirective: FormGroupDirective
  ) {
    reqDetails.roleId = "R00";
    if (!this.registerForm.valid) {
      return;
    }
    this.isLoading = true;
    this.registerOperatorService.registerOperator(reqDetails).subscribe(
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
    this.registerForm.reset();
  }

  backToDashboard() {
    this.router.navigate(["./dashboard"]);
  }
}
