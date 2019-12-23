import { NgModule } from "@angular/core";
import { MaterialModule } from "./../../material.module";
import { SharedModule } from "./../../shared/shared.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { RegisterOperatorRoutingModule } from "./register-operator-routing.module";
import { RegisterOperatorComponent } from "./register-operator.component";
import { RegisterNewOperatorComponent } from ".";

@NgModule({
  declarations: [RegisterOperatorComponent, RegisterNewOperatorComponent],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterOperatorRoutingModule
  ]
})
export class RegisterOperatorModule {}
