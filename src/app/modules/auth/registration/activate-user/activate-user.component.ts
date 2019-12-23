import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";

import { emailregex } from "src/app/config/const";
import { ToastrService } from "ngx-toastr";
import {
  InternalResponse,
  ActivateAccountRequest,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { AuthService } from "../../auth.service";
import { MustMatch } from "src/app/helpers/must-match.service";
import { Subscription } from "rxjs";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-activate-user",
  templateUrl: "./activate-user.component.html",
  styleUrls: ["../../auth.module.style.css"]
})
export class ActivateUserComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  registrationForm: FormGroup;
  isLoading = false;
  hide_1 = true;
  hide_2 = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.router.navigate(["/dashboard"]);
      }
    });
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.pattern(emailregex)]],
        oldPassword: [null, [Validators.required]],
        newPassword: [null, [Validators.required, this.checkPassword]],
        confirmPassword: [null, Validators.required]
      },
      {
        validator: MustMatch("newPassword", "confirmPassword")
      }
    );
  }

  checkPassword(control) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  getErrorEmail() {
    return this.registrationForm.get("email").hasError("required")
      ? "Email is required."
      : this.registrationForm.get("email").hasError("pattern")
      ? "Not a valid email address (domain must be jcb.com)."
      : "";
  }

  getErrorOldPassword() {
    return this.registrationForm.get("oldPassword").hasError("required")
      ? "Old Password is required"
      : "";
  }

  getErrorPassword() {
    return this.registrationForm.get("newPassword").hasError("required")
      ? "Password is required (at least eight characters, one uppercase letter and one number)"
      : this.registrationForm.get("newPassword").hasError("requirements")
      ? "Password needs to be at least eight characters, one uppercase letter and one number"
      : "";
  }

  getErrorConfirmPassword() {
    return this.registrationForm.get("confirmPassword").hasError("required")
      ? "Confirm Password is required"
      : this.registrationForm.get("confirmPassword").hasError("mustMatch")
      ? "Passwords must match"
      : "";
  }

  onSubmit(
    activateAccountRequest: ActivateAccountRequest,
    formDirective: FormGroupDirective
  ) {
    this.isLoading = true;
    this.authService.activateUserRegistration(activateAccountRequest).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.isLoading = false;
          this.toastr.success(response.success_message);
          this.router.navigate(["../registration-successful"], {
            relativeTo: this.route
          });
        } else {
          this.isLoading = false;
          response.code != 401 &&
            this.toastr.error(response.error_message, "ERROR");
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    formDirective.resetForm();
    this.registrationForm.reset();
  }

  backToLogin() {
    this.router.navigate([""], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
