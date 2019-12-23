import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "../../auth.service";
import { emailregex } from "src/app/config/const";
import { InternalResponse, INTERNAL_RESPONSE_STATUS } from "src/app/services";
import { Subscription } from "rxjs";
import { MustMatch } from "src/app/helpers/must-match.service";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["../../auth.module.style.css"]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetPasswordForm: FormGroup;
  hide = true;
  isLoading = false;
  private userSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
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
    this.resetPasswordForm = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.pattern(emailregex)]],
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

  getErrorPassword() {
    return this.resetPasswordForm.get("newPassword").hasError("required")
      ? "Password is required (at least eight characters, one uppercase letter and one number)"
      : this.resetPasswordForm.get("newPassword").hasError("requirements")
      ? "Password needs to be at least eight characters, one uppercase letter and one number"
      : "";
  }

  getErrorConfirmPassword() {
    return this.resetPasswordForm.get("confirmPassword").hasError("required")
      ? "Confirm Password is required"
      : this.resetPasswordForm.get("confirmPassword").hasError("mustMatch")
      ? "Passwords must match"
      : "";
  }

  getErrorEmail() {
    return this.resetPasswordForm.get("email").hasError("required")
      ? "Email is required."
      : this.resetPasswordForm.get("email").hasError("pattern")
      ? "Not a valid email address (domain must be jcb.com)."
      : "";
  }

  /**
   * RESET PASSWORD
   * @param reqData OLDS THE DATA FOR RESET PASSWORD REQUEST
   * @returns  SUCCESSFUL / FAILED MESSAGE RESPONSE
   */
  resetPassword(reqData) {
    let data = {
      email: reqData.email,
      newPassword: reqData.newPassword
    };
    this.isLoading = true;
    this.authService.resetPassword(data).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.isLoading = false;
          this.toastr.success(response.success_message);
          this.router.navigate(["../reset-successful"], {
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
  }

  backToLogin() {
    this.router.navigate([""], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
