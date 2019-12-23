import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { UpdateUserRoutingModule } from "./update-user-routing.module";
import { UpdateUserComponent } from "./update-user.component";
import { UpdateUserProfileComponent } from ".";

@NgModule({
  declarations: [UpdateUserComponent, UpdateUserProfileComponent],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UpdateUserRoutingModule
  ]
})
export class UpdateUserModule {}
