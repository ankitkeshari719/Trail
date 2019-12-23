import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "../../auth.service";
import { emailregex, resetPasswordUrl } from "src/app/config/const";
import {
  ForgetPasswordRequest,
  InternalResponse,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { Subscription } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["../../auth.module.style.css"]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup;
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
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)]]
    });
  }

  getErrorEmail() {
    return this.forgotPasswordForm.get("email").hasError("required")
      ? "Email is required."
      : this.forgotPasswordForm.get("email").hasError("pattern")
      ? "Not a valid email address (domain must be jcb.com)."
      : "";
  }

  /**
   * Forgets password
   * @param reqData OLDS THE DATA FOR  FORGET PASSWORD REQUEST
   * @returns  SUCCESSFUL / FAILED MESSAGE RESPONSE
   */
  forgetPassword(reqData: ForgetPasswordRequest) {
    reqData.resetPasswordUrl = resetPasswordUrl;
    this.isLoading = true;
    this.authService.forgotPassword(reqData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.isLoading = false;
          this.toastr.success(response.success_message);
          this.router.navigate([""], { relativeTo: this.route });
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
