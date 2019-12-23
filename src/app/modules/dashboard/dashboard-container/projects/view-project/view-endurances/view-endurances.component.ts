import { Component, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog
} from "@angular/material";
import {
  PojectEnduranceCycle,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "src/app/modules/dashboard/dashboard.service";
import { MessagesService, ConfirmService } from "src/app/shared";
import { merge } from "rxjs";
import { startWith, switchMap, map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { EditEnduranceComponent, SeeEnduranceComponent } from ".";

@Component({
  selector: "app-view-endurances",
  templateUrl: "./view-endurances.component.html",
  styleUrls: ["../../../../../style.css"]
})
export class ViewEndurancesComponent {
  private dsData: any;
  private idColumn = "projectEnduranceCycleId";
  resultsLength = 0;
  isLoading = true;
  projectId: string;
  dataSource = new MatTableDataSource<PojectEnduranceCycle>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  userColumns = [
    "enduranceCycleName",
    "instruction",
    "unit",
    "efforts",
    "actions"
  ];

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private messagesService: MessagesService,
    private confirmService: ConfirmService
  ) {}

  ngAfterViewInit() {
    this.projectId = this.route.parent.snapshot.params["id"];
    this.fetchAllEndurance(this.projectId);
  }

  fetchAllEndurance(projectId: string) {
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
            this.dataSource = new MatTableDataSource(data.endurance);
            this.resultsLength = data.endurance.length;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
  }

  onEditEndurance(
    index: string,
    projectEnduranceCycleId: string,
    enduranceCycleId: string,
    instruction: string,
    efforts: string,
    unit: string,
    enduranceCycleName: string
  ) {
    const dialogRef = this.dialog.open(EditEnduranceComponent, {
      data: {
        projectEnduranceCycleId: projectEnduranceCycleId,
        enduranceCycleId: enduranceCycleId,
        instruction: instruction,
        efforts: efforts,
        unit: unit,
        enduranceCycleName: enduranceCycleName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dsData = this.dataSource.data;
        const itemIndex = this.dsData.findIndex(
          obj => obj[this.idColumn] === index
        );
        let projectdata = this.dashboardService.getDialogData();
        this.dataSource.data.splice(itemIndex, 1, projectdata);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  /**
   * Deletes project user
   * @param projectUserId
   */
  deleteProjectEndurance(projectEnduranceCycleId: string) {
    this.dsData = this.dataSource.data;
    const record = this.dsData.find(
      obj => obj[this.idColumn] === projectEnduranceCycleId
    );
    this.confirmService
      .confirm(
        "Delete " + record.enduranceCycleName,
        "This action is final. Gone forever!"
      )
      .pipe(
        switchMap(res => {
          if (res === true) {
            return this.dashboardService.deleteProjectEndurance(
              projectEnduranceCycleId
            );
          }
        })
      )
      .subscribe(
        () => {
          this.success();
          this.dsData = this.dataSource.data;
          const itemIndex = this.dsData.findIndex(
            obj => obj[this.idColumn] === projectEnduranceCycleId
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

  viewEndurance(
    enduranceCycleName: string,
    instruction: string,
    unit: string,
    efforts: string
  ) {
    const dialogRef = this.dialog.open(SeeEnduranceComponent, {
      data: {
        enduranceCycleName: enduranceCycleName,
        instruction: instruction,
        unit: unit,
        efforts: efforts
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
