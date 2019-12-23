import { Component, ViewChild, Output, EventEmitter } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import { merge } from "rxjs";
import { DashboardService } from "../../dashboard.service";
import { startWith, switchMap, map } from "rxjs/operators";

import { INTERNAL_RESPONSE_STATUS } from "src/app/services";
import { Operator } from "../../../../services/configurations.service";
import { GET_OPERATORS_LIST } from "src/app/config/backend.api.urls";

@Component({
  selector: "app-operators",
  templateUrl: "./operators.component.html",
  styleUrls: ["../../../style.css"]
})
export class OperatorsComponent {
  operatorsColumns = ["name", "projectName"];
  dataSource = new MatTableDataSource<Operator>();
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() operatorLoaderEvent = new EventEmitter<boolean>();

  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.fetchAllOperators();
  }

  /**
   * FUNCTION TO GET ALL THE PROJECTS DATA AND MERGE WITH PAGE INDEX AND PAZE SIZE
   */
  fetchAllOperators() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataSource.paginator = this.paginator;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.operatorLoaderEvent.emit(this.isLoadingResults);
          return this.dashboardService.getDashboardDataList(
            GET_OPERATORS_LIST,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map(data => {
          if (data.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
            this.isLoadingResults = false;
            this.operatorLoaderEvent.emit(this.isLoadingResults);
            return data.success_data;
          } else {
            this.isLoadingResults = false;
            this.operatorLoaderEvent.emit(this.isLoadingResults);
            data.code !== 401 && this.toastr.error(data.error_message, "ERROR");
          }
        })
      )
      .subscribe(data => {
        if (data) {
          data.operators.map(data => {
            return (data.imageUrl =
              "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50");
          });
          this.dataSource = new MatTableDataSource(data.operators);
          this.resultsLength = data.totalOperators;
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
}
