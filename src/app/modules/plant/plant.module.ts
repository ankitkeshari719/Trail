import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlantRoutingModule } from "./plant-routing.module";
import { PlantComponent } from "./plant.component";

@NgModule({
  declarations: [PlantComponent],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PlantRoutingModule
  ]
})
export class PlantModule {}
