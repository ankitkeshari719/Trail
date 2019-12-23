import { Component, ViewChild } from "@angular/core";
import {
  CommonList,
  ProjectUser,
  INTERNAL_RESPONSE_STATUS,
  InternalResponse
} from "src/app/services";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog
} from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "src/app/modules/dashboard/dashboard.service";
import { PlantService } from "src/app/modules/plant";
import { ToastrService } from "ngx-toastr";
import { MessagesService, ConfirmService } from "src/app/shared";
import { merge } from "rxjs";
import { startWith, switchMap, map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { GET_USER_ROLES } from "src/app/config/backend.api.urls";
import { EditMemberComponent, SeeMemberComponent } from ".";

@Component({
  selector: "app-view-members",
  templateUrl: "./view-members.component.html",
  styleUrls: ["../../../../../style.css"]
})
export class ViewMembersComponent {
  private dsData: any;
  private idColumn = "projectUserId";
  plantList: CommonList[];
  roleList: CommonList[];
  userColumns = [
    "userName",
    "plantName",
    "roleName",
    "active",
    "mobileNumber",
    "actions"
  ];
  dataSource = new MatTableDataSource<ProjectUser>();
  resultsLength = 0;
  isLoading = true;
  projectId: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private toastr: ToastrService,
    private dashboardService: DashboardService,
    private messagesService: MessagesService,
    private confirmService: ConfirmService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.projectId = this.route.parent.snapshot.params["id"];
    this.fetchAllUser(this.projectId);
    this.getPlantList();
    this.getRoleList();
  }

  fetchAllUser(projectId: string) {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataSource.paginator = this.paginator;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.dashboardService.getProjectDetails(projectId);
        }),
        map(data => {
          if (data.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
            this.isLoading = false;
            return data.success_data;
          } else {
            this.isLoading = false;
            data.code !== 401 && this.toastr.error(data.error_message, "ERROR");
          }
        })
      )
      .subscribe(
        data => {
          if (data) {
            this.dataSource = new MatTableDataSource(data.users);
            this.resultsLength = data.users.length;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
  }

  /**
   * Gets plant list
   */
  getPlantList() {
    this.plantService.getPlantList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.plantList = response.success_data.plants;
        } else {
          response.code != 401 &&
            this.toastr.error(response.error_message, "ERROR");
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
        this.isLoading = false;
      }
    );
  }

  getRoleList() {
    this.isLoading = true;
    this.dashboardService.getDashboardData(GET_USER_ROLES).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.roleList = response.success_data.roles;
          this.getPlantList();
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

  onEditUser(
    index: string,
    projectUserId: string,
    assignedUser: string,
    assignedUserName: string,
    mobileNumber: string,
    plantId: string,
    role: string,
    active: string
  ) {
    const dialogRef = this.dialog.open(EditMemberComponent, {
      data: {
        projectUserId: projectUserId,
        assignedUser: assignedUser,
        assignedUserName: assignedUserName,
        mobileNumber: mobileNumber,
        plantId: plantId,
        role: role,
        active: active,
        projectId: this.projectId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dsData = this.dataSource.data;
        const itemIndex = this.dsData.findIndex(
          obj => obj[this.idColumn] === index
        );
        let projectdata = this.dashboardService.getDialogData();
        let plant = this.plantList.filter(e => e.id === projectdata.plantId);
        let role = this.roleList.filter(e => e.id === projectdata.role);
        if (plant && role) {
          projectdata.plantName = plant[0].name;
          projectdata.roleName = role[0].name;
        }
        this.dataSource.data.splice(itemIndex, 1, projectdata);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  /**
   * Deletes project user
   * @param projectUserId
   */
  deleteProjectUser(projectUserId: string) {
    this.dsData = this.dataSource.data;
    const record = this.dsData.find(
      obj => obj[this.idColumn] === projectUserId
    );
    this.confirmService
      .confirm(
        "Delete " + record.assignedUserName,
        "This action is final. Gone forever!"
      )
      .pipe(
        switchMap(res => {
          if (res === true) {
            return this.dashboardService.deleteProjectUser(projectUserId);
          }
        })
      )
      .subscribe(
        () => {
          this.success();
          this.dsData = this.dataSource.data;
          const itemIndex = this.dsData.findIndex(
            obj => obj[this.idColumn] === projectUserId
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

  viewUser(
    assignedUserName: string,
    roleName: string,
    plantName: string,
    active: string,
    mobileNumber: string
  ) {
    const dialogRef = this.dialog.open(SeeMemberComponent, {
      data: {
        plantName: plantName,
        roleName: roleName,
        assignedUserName: assignedUserName,
        mobileNumber: mobileNumber,
        active: active
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private success() {
    this.messagesService.openDialog(
      "Success",
      "Database updated as you wished!"
    );
  }
}
