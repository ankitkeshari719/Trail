import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "./../../material.module";

import { AddUserRoutingModule } from "./add-user-routing.module";
import { AddNewUserComponent } from "./add-new-user/add-new-user.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AddUserComponent } from "./add-user.component";

@NgModule({
  declarations: [AddNewUserComponent, AddUserComponent],
  imports: [
    AddUserRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddUserModule {}
