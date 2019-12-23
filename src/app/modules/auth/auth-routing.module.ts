import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";
import {
  LoginComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  RegistrationSuccessfulComponent,
  ActivateUserComponent,
  RegisterUserComponent,
  ResetSuccessfulComponent
} from ".";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "", component: LoginComponent },
      { path: "register", component: RegisterUserComponent },
      { path: "activate-user", component: ActivateUserComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
      { path: "reset-password", component: ResetPasswordComponent },
      {
        path: "registration-successful",
        component: RegistrationSuccessfulComponent
      },
      {
        path: "reset-successful",
        component: ResetSuccessfulComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
