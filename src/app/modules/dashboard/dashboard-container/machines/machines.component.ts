import { Component, ViewChild, Output, EventEmitter } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { merge } from "rxjs";
import { startWith, switchMap, map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

import {
  INTERNAL_RESPONSE_STATUS,
  Machine,
  InternalResponse
} from "src/app/services";
import { GET_MACHINES_USERS } from "src/app/config/backend.api.urls";
import { DashboardService } from "../../dashboard.service";
import { handleResponse } from "src/app/config/helper.function";

@Component({
  selector: "app-machines",
  templateUrl: "./machines.component.html",
  styleUrls: ["../../../style.css"]
})
export class MachinesComponent {
  machineColumns = ["machineName", "projectName"];
  dataSource = new MatTableDataSource<Machine>();
  resultsLength = 0;
  isLoading = true;
  private idColumn = "vin";

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() machineLoaderEvent = new EventEmitter<boolean>();

  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.fetchAllMachines();
  }

  /**
   * FUNCTION TO GET ALL THE PROJECTS DATA AND MERGE WITH PAGE INDEX AND PAZE SIZE
   */
  fetchAllMachines() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataSource.paginator = this.paginator;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          this.machineLoaderEvent.emit(this.isLoading);
          return this.dashboardService.getDashboardDataList(
            GET_MACHINES_USERS,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map(data => {
          if (data.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
            this.isLoading = false;
            this.machineLoaderEvent.emit(this.isLoading);
            return data.success_data;
          } else {
            this.isLoading = false;
            this.machineLoaderEvent.emit(this.isLoading);
            data.code !== 401 && this.toastr.error(data.error_message, "ERROR");
          }
        })
      )
      .subscribe(
        data => {
          if (data) {
            this.dataSource = new MatTableDataSource(data.machines);
            this.resultsLength = data.totalMachines;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
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
}
