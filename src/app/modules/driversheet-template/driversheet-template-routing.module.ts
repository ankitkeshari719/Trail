import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DriversheetTemplateComponent } from "./driversheet-template.component";

const routes: Routes = [
  {
    path: "",
    component: DriversheetTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversheetTemplateRoutingModule {}
