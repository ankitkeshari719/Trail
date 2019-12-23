import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DsTemplateEditComponent, DriverSheetTemplateComponent } from ".";
import { CommonsComponent } from "./commons.component";

const routes: Routes = [
  {
    path: "",
    component: CommonsComponent,
    children: [
      { path: "", component: DriverSheetTemplateComponent },
      { path: "edit", component: DsTemplateEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonsRoutingModule {}
