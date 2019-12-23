import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddNewUserComponent } from ".";
import { AddUserComponent } from "./add-user.component";

const routes: Routes = [
  {
    path: "",
    component: AddUserComponent,
    children: [{ path: "", component: AddNewUserComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUserRoutingModule {}
