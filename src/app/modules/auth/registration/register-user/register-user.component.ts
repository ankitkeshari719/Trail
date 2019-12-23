import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective
} from "@angular/forms";
import {
  UserRegistrationRequest,
  InternalResponse,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { emailregex, activateUserUrl } from "src/app/config/const";
import { AuthService } from "../../auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["../../auth.module.style.css"]
})
export class RegisterUserComponent implements OnInit {
  private userSub: Subscription;
  registerForm: FormGroup;
  isLoading = false;
  hide = true;

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
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  get firstName() {
    return this.registerForm.get("firstName") as FormControl;
  }

  get lastName() {
    return this.registerForm.get("lastName") as FormControl;
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
   * Determines whether submit on
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
    reqDetails.selfRegistration = true;
    this.isLoading = true;
    this.authService.registerUser(reqDetails).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.isLoading = false;
          this.toastr.success(response.success_message);
          this.router.navigate(["../activate-user"], {
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
    this.registerForm.reset();
  }

  backToLogin() {
    this.router.navigate([""], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
