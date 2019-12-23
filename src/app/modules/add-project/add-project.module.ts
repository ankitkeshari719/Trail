import { SharedModule } from './../../shared/shared.module';
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddProjectRoutingModule } from "./add-project-routing.module";
import { AddProjectComponent } from "./add-project.component";

@NgModule({
  declarations: [AddProjectComponent],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AddProjectRoutingModule
  ]
})
export class AddProjectModule {}
