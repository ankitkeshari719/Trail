import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../dashboard/dashboard.service";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["../style.css"]
})
export class GraphComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.setTitle("Graph");
  }
}
