import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RegisterNewOperatorComponent } from ".";
import { RegisterOperatorComponent } from "./register-operator.component";

const routes: Routes = [
  {
    path: "",
    component: RegisterOperatorComponent,
    children: [{ path: "", component: RegisterNewOperatorComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterOperatorRoutingModule {}
