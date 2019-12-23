import { OnInit, Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import {
  InternalResponse,
  DashboardCountResponse,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { DashboardService } from "../dashboard.service";
import { HttpErrorResponse } from "@angular/common/http";
import {
  dashboard_folder_image,
  dashboard_operator_image,
  dashboard_machine_image
} from "src/app/config/const";

@Component({
  selector: "app-dashboard-container",
  templateUrl: "./dashboard-container.component.html",
  styleUrls: ["../../style.css"]
})
export class DashboardContainerComponent implements OnInit {
  isLoading: boolean;
  dashboardCounts: DashboardCountResponse;
  projectLoader: boolean = true;
  operatorLoader: boolean = true;
  machineLoader: boolean = true;
  dashboard_folder_image: string;
  dashboard_operator_image: string;
  dashboard_machine_image: string;

  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.dashboard_folder_image = dashboard_folder_image;
    this.dashboard_operator_image = dashboard_operator_image;
    this.dashboard_machine_image = dashboard_machine_image;
    this.dashboardService.setTitle("Dashboard");
    this.getDashboardCounts();
  }

  getDashboardCounts() {
    this.isLoading = true;
    this.dashboardService.getDashboardCount().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.dashboardCounts = responseData.success_data;
        } else {
          response.code != 401 &&
            this.toastr.error(response.error_message, "ERROR");
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  /**
   * RECEIVING THE LOADER VALUE FROM CHILD COMPONENT
   */
  receiveProjectLoader($event: boolean) {
    this.projectLoader = $event;
  }
  receiveMachineLoader($event: boolean) {
    this.machineLoader = $event;
  }
  receiveOperaotrLoader($event: boolean) {
    this.operatorLoader = $event;
  }
}
