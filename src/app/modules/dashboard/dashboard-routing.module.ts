import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/helpers/auth.guard";
import { RoleGuard } from "src/app/helpers/role.guard";
import { Role } from "src/app/models";
import {
  DashboardComponent,
  DashboardContainerComponent,
  ViewProjectComponent,
  ViewMachinesComponent,
  ViewMembersComponent,
  ViewEndurancesComponent,
  ViewTimelinesComponent,
  ViewCommentsComponent,
  ViewFaultsComponent,
  ViewDriversheetsComponent,
  CreateDriversheetComponent
} from ".";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", component: DashboardContainerComponent },
      {
        path: "view-project/:id",
        component: ViewProjectComponent,
        children: [
          { path: "", redirectTo: "machines", pathMatch: "prefix" },
          { path: "machines", component: ViewMachinesComponent },
          { path: "members", component: ViewMembersComponent },
          { path: "endurances", component: ViewEndurancesComponent },
          { path: "timelines", component: ViewTimelinesComponent },
          { path: "comments", component: ViewCommentsComponent },
          { path: "faults", component: ViewFaultsComponent },
          {
            path: "driversheets",
            component: ViewDriversheetsComponent
          },
          {
            path: "create-driver-sheets",
            component: CreateDriversheetComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
