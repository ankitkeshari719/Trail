import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Project, InternalResponse, INTERNAL_RESPONSE_STATUS } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../../dashboard.service';

@Component({
  selector: "app-view-project",
  templateUrl: "./view-project.component.html",
  styleUrls: ["../../../../style.css"]
})
export class ViewProjectComponent implements OnInit {
  public isLoading: boolean = false;
  public projectId: string;
  public projectDetails: Project;
  public machineCount: number = 0;
  navbarOpen = true;

  constructor(
    private route: ActivatedRoute,
    private dashBoardService: DashboardService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get("id");
    });
    this.getProjectDetails();
  }

  getProjectDetails() {
    this.isLoading = true;
    this.dashBoardService.getProjectDetails(this.projectId).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.projectDetails = response.success_data;
          this.machineCount = response.success_data.machines.length;
          this.dashBoardService.setTitle(this.projectDetails.projectName);
          this.isLoading = false;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
        this.isLoading = false;
      }
    );
  }

  getRagStyle(status: string) {
    switch (status) {
      case "Green":
        return "green";
      case "Red":
        return "red";
      case "Amber":
        return "#FFBF00";
    }
  }
}
