import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "./../../material.module";
import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthGuard } from "src/app/helpers/auth.guard";
import { RoleGuard } from "src/app/helpers/role.guard";
import {
  DashboardComponent,
  DashboardContainerComponent,
  ProjectsComponent,
  MachinesComponent,
  OperatorsComponent,
  ViewProjectComponent,
  ViewCommentsComponent,
  ViewFaultsComponent,
  ViewMachinesComponent,
  ViewMembersComponent,
  ViewTimelinesComponent,
  ViewEndurancesComponent,
  ViewDriversheetsComponent,
  CreateDriversheetComponent,
  SeeEnduranceComponent,
  EditEnduranceComponent,
  SeeMachineComponent,
  EditMachineComponent,
  EditMemberComponent,
  SeeMemberComponent
} from ".";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardContainerComponent,
    ProjectsComponent,
    MachinesComponent,
    OperatorsComponent,
    ViewProjectComponent,
    ViewCommentsComponent,
    ViewFaultsComponent,
    ViewMachinesComponent,
    ViewMembersComponent,
    ViewTimelinesComponent,
    ViewEndurancesComponent,
    ViewDriversheetsComponent,
    CreateDriversheetComponent,
    SeeEnduranceComponent,
    EditEnduranceComponent,
    SeeMachineComponent,
    EditMachineComponent,
    EditMemberComponent,
    SeeMemberComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, RoleGuard],
  entryComponents: [
    EditEnduranceComponent,
    SeeEnduranceComponent,
    EditMachineComponent,
    SeeMachineComponent,
    EditMemberComponent,
    SeeMemberComponent
  ]
})
export class DashboardModule {}
