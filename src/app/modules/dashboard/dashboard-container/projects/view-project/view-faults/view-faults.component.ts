import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Machine, INTERNAL_RESPONSE_STATUS } from "src/app/services";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "src/app/modules/dashboard/dashboard.service";
import { ActivatedRoute } from "@angular/router";
import { merge } from "rxjs";
import { startWith, switchMap, map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-view-faults",
  templateUrl: "./view-faults.component.html",
  styleUrls: ["../../../../../style.css"]
})
export class ViewFaultsComponent {
  machineColumns = [
    "title",
    "description",
    "added_by",
    "date",
    "test_plant",
    "machine_model",
    "vin"
  ];
  dataSource = new MatTableDataSource<Machine>();
  resultsLength = 0;
  isLoading = true;
  projectId: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private toastr: ToastrService,
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.projectId = this.route.parent.snapshot.params["id"];
    this.fetchAllFaults(this.projectId);
  }

  fetchAllFaults(projectId) {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataSource.paginator = this.paginator;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.dashboardService.getProjectFaultList(projectId);
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
            this.dataSource = new MatTableDataSource(data.projectFaultList);
            this.resultsLength = data.projectFaultList.length;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
