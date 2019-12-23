import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DeviceComponent } from "./device.component";
import { DeviceOperationComponent } from ".";

const routes: Routes = [
  {
    path: "",
    component: DeviceComponent,
    children: [{ path: "", component: DeviceOperationComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule {}
