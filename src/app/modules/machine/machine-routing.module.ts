import { MachineComponent } from "./machine.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddMachineComponent } from "./add-machine/add-machine.component";
import { EditMachineComponent } from "./edit-machine/edit-machine.component";

const routes: Routes = [
  {
    path: "",
    component: MachineComponent,
    children: [
      { path: "", component: AddMachineComponent },
      { path: "edit-machine", component: EditMachineComponent },
      { path: "delete-machine", component: EditMachineComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachineRoutingModule {}
