import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { MaterialModule } from "./../../material.module";

import { SharedModule } from "./../../shared/shared.module";
import {
  LoginComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  RegistrationSuccessfulComponent,
  ResetSuccessfulComponent,
  RegisterUserComponent,
  ActivateUserComponent
} from ".";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegistrationSuccessfulComponent,
    ResetSuccessfulComponent,
    RegisterUserComponent,
    ActivateUserComponent
  ],
  imports: [
    AuthRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [CookieService]
})
export class AuthModule {}
