import { RoleGuard } from "src/app/helpers/role.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./helpers/auth.guard";
import { SessionExpireComponent } from "./shared";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/auth",
    pathMatch: "full"
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth.module").then(mod => mod.AuthModule)
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        mod => mod.DashboardModule
      )
  },
  {
    path: "add-project",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/add-project/add-project.module").then(
        mod => mod.AddProjectModule
      )
  },
  {
    path: "question",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/question-bank/question-bank.module").then(
        mod => mod.QuestionBankModule
      )
  },
  {
    path: "update-user",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/update-user/update-user.module").then(
        mod => mod.UpdateUserModule
      )
  },
  {
    path: "graph",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/graph/graph.module").then(mod => mod.GraphModule)
  },
  {
    path: "add-user",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/add-user/add-user.module").then(
        mod => mod.AddUserModule
      )
  },
  {
    path: "register-operator",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/register-operator/register-operator.module").then(
        mod => mod.RegisterOperatorModule
      )
  },
  {
    path: "handle-roles",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/user-roles/user-roles.module").then(
        mod => mod.UserRolesModule
      )
  },
  {
    path: "device",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/device/device.module").then(mod => mod.DeviceModule)
  },
  {
    path: "platform",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/platform/platform.module").then(
        mod => mod.PlatformModule
      )
  },
  {
    path: "plants",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/plant/plant.module").then(mod => mod.PlantModule)
  },
  {
    path: "machine",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/machine/machine.module").then(mod => mod.MachineModule)
  },
  {
    path: "question-category",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        "./modules/question-category-bank/question-category-bank.module"
      ).then(mod => mod.QuestionCategoryBankModule)
  },
  {
    path: "driversheet",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/common/commons.module").then(mod => mod.CommonsModule)
  },
  { path: "session-expire", component: SessionExpireComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
