import { CookieService } from "ngx-cookie-service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UserLoginRequest } from "src/app/services";
import { emailregex } from "src/app/config/const";
import { decryptData } from "src/app/helpers/crypto";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../auth.module.style.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hide = true;
  isLoading = false;
  image_url: string;
  private userSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.createForm();
    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.router.navigate(["/dashboard"]);
      }
    });
  }

  createForm() {
    const cookie_email = this.cookieService.get("email");
    const cookie_password = decryptData(this.cookieService.get("password"));
    const cookie_checked = this.cookieService.get("checked");
    this.loginForm = this.formBuilder.group({
      email: [
        cookie_email ? cookie_email : null,
        [Validators.required, Validators.pattern(emailregex)]
      ],
      password: [
        cookie_password ? cookie_password : null,
        [Validators.required]
      ],
      checked: [cookie_checked ? cookie_checked : false]
    });
  }

  getErrorEmail() {
    return this.loginForm.get("email").hasError("required")
      ? "Email is required."
      : this.loginForm.get("email").hasError("pattern")
        ? "Not a valid email address (domain must be jcb.com)."
        : "";
  }

  getErrorPassword() {
    return this.loginForm.get("password").hasError("required")
      ? "Password is required"
      : "";
  }

  /**
   * Logins login component
   * @param data HOLDS THE DATA FOR  LOGIN REQUEST
   * @returns  SUCCESSFUL / FAILED MESSAGE RESPONSE
   */
  login(loginRequestDetails: UserLoginRequest): void {
    this.isLoading = true;
    this.authService.loginUser(loginRequestDetails).subscribe(response => {
      if (response) {
        this.isLoading = false;
        response.code != 401 && this.toastr.error(response.error_message, "ERROR");
      } else {
        this.isLoading = false;
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  onForgotPassword() {
    this.router.navigate(["forgot-password"], { relativeTo: this.route });
  }

  onNewRegister() {
    this.router.navigate(["register"], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
