import { NgModule } from "@angular/core";
import { NgxEchartsModule } from "ngx-echarts";

import { GraphRoutingModule } from "./graph-routing.module";
import {
  DutycycleProformanceComponent,
  ProjectByLocationComponent,
  FaultTrendComponent,
  OverallDistributionDriverComponent
} from ".";
import { GraphComponent } from "./graph.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    DutycycleProformanceComponent,
    ProjectByLocationComponent,
    FaultTrendComponent,
    OverallDistributionDriverComponent,
    GraphComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GraphRoutingModule,
    NgxEchartsModule
  ]
})
export class GraphModule {}
