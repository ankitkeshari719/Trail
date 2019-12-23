import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserRoleComponent } from "./user-role.component";
import { AssignUserRoleComponent } from ".";

const routes: Routes = [
  {
    path: "",
    component: UserRoleComponent,
    children: [{ path: "", component: AssignUserRoleComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRolesRoutingModule {}
