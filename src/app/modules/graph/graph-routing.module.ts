import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  GraphComponent,
  ProjectByLocationComponent,
  DutycycleProformanceComponent,
  FaultTrendComponent,
  OverallDistributionDriverComponent
} from ".";

const routes: Routes = [
  {
    path: "",
    component: GraphComponent
  }
];

const routes_1: Routes = [
  {
    path: "",
    component: FaultTrendComponent,
    children: [
      { path: "", component: FaultTrendComponent },
      {
        path: "fault-trend",
        component: FaultTrendComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphRoutingModule {}
