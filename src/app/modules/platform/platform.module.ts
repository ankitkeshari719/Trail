import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PlatformRoutingModule } from "./platform-routing.module";
import { PlatformComponent } from "./platform.component";

@NgModule({
  declarations: [PlatformComponent],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PlatformRoutingModule
  ]
})
export class PlatformModule {}
