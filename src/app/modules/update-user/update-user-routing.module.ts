import { UpdateUserComponent } from "./update-user.component";
import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { UpdateUserProfileComponent } from ".";

const routes: Routes = [
  {
    path: "",
    component: UpdateUserComponent,
    children: [{ path: "", component: UpdateUserProfileComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateUserRoutingModule {}
