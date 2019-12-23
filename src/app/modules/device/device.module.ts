import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/material.module";

import { DeviceRoutingModule } from "./device-routing.module";
import { DeviceComponent } from "./device.component";
import { DeviceOperationComponent } from "./device-operation/device-operation.component";

@NgModule({
  declarations: [DeviceComponent, DeviceOperationComponent],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DeviceRoutingModule
  ]
})
export class DeviceModule {}
