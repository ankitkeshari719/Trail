import { AuthService } from "src/app/modules/auth/auth.service";
import { Component, ViewChild, Output, EventEmitter } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import {
  Project,
  INTERNAL_RESPONSE_STATUS,
  InternalResponse,
  CommonList
} from "src/app/services";
import { Router, ActivatedRoute } from "@angular/router";

import { DashboardService } from "../../dashboard.service";
import { ToastrService } from "ngx-toastr";
import { MessagesService, ConfirmService } from "src/app/shared";
import { merge } from "rxjs";
import { startWith, switchMap, map } from "rxjs/operators";
import {
  GET_PROJECT_LIST,
  GET_USER_ROLES
} from "src/app/config/backend.api.urls";
import { HttpErrorResponse } from "@angular/common/http";
import * as moment from "moment";
import { dashboard_timeline_image } from "src/app/config/const";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["../../../style.css"]
})
export class ProjectsComponent {
  private idColumn = "projectId";
  private dsData: any;
  public dataSource = new MatTableDataSource<Project>();
  public resultsLength: number;
  public isLoadingResults = true;
  public roles: CommonList[];
  public role: string;
  public dashboard_timeline_image: string;
  public projectColumns = [
    "projectName",
    "type",
    "projectStatus",
    "targetHours",
    "completedHours",
    "numberOfMachines",
    "createdOn",
    "timeline",
    "actions"
  ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() projectLoaderEvent = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    private messagesService: MessagesService,
    private confirmService: ConfirmService,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    this.dashboard_timeline_image = dashboard_timeline_image;
    this.fetchAllProjects();
    this.getRoleList();
  }

  getRoleList() {
    this.dashboardService.getDashboardData(GET_USER_ROLES).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.roles = response.success_data.roles;
          let userData = JSON.parse(window.localStorage.getItem("userData"));
          let r =
            userData && this.roles.filter(el => el.id === userData.roleId);
          if (r.length) {
            this.role = r[0].name;
          }
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
   * FUNCTION TO GET ALL THE PROJECTS DATA AND MERGE WITH PAGE INDEX AND PAZE SIZE
   */
  fetchAllProjects() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataSource.paginator = this.paginator;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.projectLoaderEvent.emit(this.isLoadingResults);
          return this.dashboardService.getDashboardDataList(
            GET_PROJECT_LIST,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map(data => {
          if (data.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
            this.isLoadingResults = false;
            this.projectLoaderEvent.emit(this.isLoadingResults);
            return data.success_data;
          } else {
            this.isLoadingResults = false;
            this.projectLoaderEvent.emit(this.isLoadingResults);
            data.code !== 401 && this.toastr.error(data.error_message, "ERROR");
          }
        })
      )
      .subscribe(data => {
        if (data) {
          data.projects.map(data => {
            return (data.createdOn = moment(data.createdOn).format("L"));
          });
          this.dataSource = new MatTableDataSource(data.projects);
          this.resultsLength = data.totalProjects;
        }
      });
  }

  /**
   * FUNCTION TO APPLY FILTER ON PROJECTS TABLE
   * @param filterValue : FILTER VALUE SEND
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(projectId) {
    const dsData = this.dataSource.data;
    const record = dsData.find(obj => obj[this.idColumn] === projectId);
    this.confirmService
      .confirm(
        "Delete " + record.projectName,
        "This action is final. Gone forever!"
      )
      .pipe(
        switchMap(res => {
          if (res === true) {
            return this.dashboardService.deleteProject(projectId);
          }
        })
      )
      .subscribe(
        response => {
          this.success();
          // Remove the deleted row from the data table. Need to remove from the downloaded data first.
          this.dsData = this.dataSource.data;
          const itemIndex = this.dsData.findIndex(
            obj => obj[this.idColumn] === projectId
          );
          this.dataSource.data.splice(itemIndex, 1);
          this.dataSource.paginator = this.paginator;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          this.messagesService.openDialog("Error", "Delete did not happen.");
        }
      );
  }

  // Remove the deleted row from the data table. Need to remove from the downloaded data first.
  private deleteRowDataTable(recordId, idColumn, paginator, dataSource) {
    this.dsData = dataSource.data;
    const itemIndex = this.dsData.findIndex(obj => obj[idColumn] === recordId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }

  onEdit(projectId) {
    let updatedProjectdata = {
      vin: "ABC12345",
      modelId: "JCB12345",
      projectId: "",
      platformId: "P101",
      plantId: "",
      machineName: "Excavators"
    };

    let projectdata = {
      active: false,
      completedHours: 100,
      createdOn: "09/20/2019",
      endDate: "12/05/2019",
      numberOfMachines: 3,
      projectId: "P912",
      projectName: "P912 - ProjectName XYZ",
      projectStatus: "Green",
      targetHours: 200,
      type: "NPIP"
    };
    this.dashboardService.editProject(updatedProjectdata).subscribe(
      response => {
        this.success();
        this.dsData = this.dataSource.data;
        const itemIndex = this.dsData.findIndex(
          obj => obj[this.idColumn] === projectId
        );
        // const record = this.dsData.find(
        //   obj => obj[this.idColumn] === projectId
        // );
        this.dataSource.data.splice(itemIndex, 1, projectdata);
        this.dataSource.paginator = this.paginator;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
        this.handleError(err);
      }
    );
  }

  private success() {
    this.messagesService.openDialog(
      "Success",
      "Database updated as you wished!"
    );
  }

  private handleError(error) {
    this.messagesService.openDialog(
      "Error em1",
      "Please check your Internet connection."
    );
  }

  /**
   * FUNCTION TO ADD DYNAMIC STYLING TO RAG COLUMN
   * @param status
   * @returns
   */
  getRagStyle(status: string) {
    switch (status) {
      case "CLOSE":
        return "green";
      case "INPROGRESS":
        return "red";
      case "COMPLETED":
        return "#FFBF00";
    }
  }

  getActionStyle(status: string) {
    switch (status) {
      case "edit":
        return "#249F20";
      case "delete":
        return "#A32424";
      case "continue":
        return "#0079B8";
    }
  }

  viewProject(id: string) {
    this.router.navigate(["view-project", id], { relativeTo: this.route });
  }
}
