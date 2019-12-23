import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../dashboard/dashboard.service";

@Component({
  selector: "app-user-role",
  templateUrl: "./user-role.component.html",
  styleUrls: ["../style.css"]
})
export class UserRoleComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
  }
}
