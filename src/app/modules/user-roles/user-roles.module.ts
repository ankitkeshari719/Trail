import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material.module";
import { SharedModule } from "src/app/shared/shared.module";

import { UserRolesRoutingModule } from "./user-roles-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { UserRoleComponent } from "./user-role.component";
import { AssignUserRoleComponent } from ".";

@NgModule({
  declarations: [UserRoleComponent, AssignUserRoleComponent],
  imports: [
    UserRolesRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserRolesModule {}
