import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./../../material.module";
import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";

import { DriversheetTemplateRoutingModule } from "./driversheet-template-routing.module";
import { DriversheetTemplateComponent } from "./driversheet-template.component";

@NgModule({
  declarations: [DriversheetTemplateComponent],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DriversheetTemplateRoutingModule
  ]
})
export class DriversheetTemplateModule {}
