import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MachineRoutingModule } from './machine-routing.module';
import { MachineComponent } from './machine.component';
import { EditMachineComponent } from './edit-machine/edit-machine.component';
import { AddMachineComponent } from './add-machine/add-machine.component';


@NgModule({
  declarations: [MachineComponent, EditMachineComponent, AddMachineComponent],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MachineRoutingModule
  ]
})
export class MachineModule {}
