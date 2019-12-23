import { Component, ViewChild } from "@angular/core";
import {
  CommonList,
  Machine,
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
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "src/app/modules/dashboard/dashboard.service";
import { MachineService } from "src/app/modules/machine/machine.service";
import { PlatformService } from "src/app/modules/platform";
import { PlantService } from "src/app/modules/plant";
import { MessagesService, ConfirmService } from "src/app/shared";
import { merge } from "rxjs";
import { startWith, switchMap, map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { SeeMachineComponent, EditMachineComponent } from ".";

@Component({
  selector: "app-view-machines",
  templateUrl: "./view-machines.component.html",
  styleUrls: ["../../../../../style.css"]
})
export class ViewMachinesComponent {
  private dsData: any;
  private idColumn = "projectMachineId";
  platformList: CommonList[];
  plantList: CommonList[];
  modelList: CommonList[];
  machineColumns = [
    "machineName",
    "modelName",
    "plantName",
    "platformName",
    "vin",
    "targetHours",
    "active",
    "actions"
  ];
  dataSource = new MatTableDataSource<Machine>();
  resultsLength = 0;
  isLoading = true;
  projectId: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private machineService: MachineService,
    private platformService: PlatformService,
    private plantService: PlantService,
    private messagesService: MessagesService,
    private confirmService: ConfirmService
  ) {}

  ngAfterViewInit() {
    this.projectId = this.route.parent.snapshot.params["id"];
    this.fetchAllMachines(this.projectId);
    this.getPlatformList();
    this.getPlantList();
    this.getModelList();
  }

  fetchAllMachines(projectId: string) {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataSource.paginator = this.paginator;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.dashboardService.getProjectMachineList(projectId);
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
            this.dataSource = new MatTableDataSource(data.projectMachineList);
            this.resultsLength = data.projectMachineList.length;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
  }

  onEdit(
    index: string,
    projectMachineId: string,
    machineName: string,
    targetHours: string,
    vin: string,
    modelId: string,
    platformId: string,
    plantId: string,
    active: string
  ) {
    const dialogRef = this.dialog.open(EditMachineComponent, {
      data: {
        projectMachineId: projectMachineId,
        machineName: machineName,
        targetHours: targetHours,
        vin: vin,
        modelId: modelId,
        platformId: platformId,
        plantId: plantId,
        active: active
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
        let platform = this.platformList.filter(
          e => e.id === projectdata.platformId
        );
        let model = this.modelList.filter(e => e.id === projectdata.modelId);
        if (plant && platform && model) {
          projectdata.modelName = model[0].name;
          projectdata.plantName = plant[0].name;
          projectdata.platformName = platform[0].name;
        }
        this.dataSource.data.splice(itemIndex, 1, projectdata);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  /**
   * Gets Platform List
   */
  getPlatformList() {
    this.isLoading = true;
    this.platformService.getPlatformList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.platformList = response.success_data.platforms;
          this.getPlantList();
        } else {
          this.isLoading = false;
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

  /**
   * Gets plant list
   */
  getPlantList() {
    this.plantService.getPlantList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.plantList = response.success_data.plants;
          this.getModelList();
        } else {
          this.isLoading = false;
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

  getModelList() {
    this.machineService.getModelList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.modelList = response.success_data.models;
        } else {
          this.isLoading = false;
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

  /**
   * Deletes Project Machine
   * @param projectMachineId
   */
  deleteProjectMachine(projectMachineId: string) {
    this.dsData = this.dataSource.data;
    const record = this.dsData.find(
      obj => obj[this.idColumn] === projectMachineId
    );
    this.confirmService
      .confirm(
        "Delete " + record.machineName,
        "This action is final. Gone forever!"
      )
      .pipe(
        switchMap(res => {
          if (res === true) {
            return this.dashboardService.deleteProjectMachine(projectMachineId);
          }
        })
      )
      .subscribe(
        () => {
          this.success();
          this.dsData = this.dataSource.data;
          const itemIndex = this.dsData.findIndex(
            obj => obj[this.idColumn] === projectMachineId
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

  /**
   * Views Machine
   * @param vin
   */
  viewMachine(
    machineName: string,
    modelName: string,
    plantName: string,
    platformName: string,
    vin: string,
    active: string,
    targetHours: string
  ) {
    const dialogRef = this.dialog.open(SeeMachineComponent, {
      data: {
        plantName: plantName,
        machineName: machineName,
        modelName: modelName,
        platformName: platformName,
        vin: vin,
        targetHours: targetHours,
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
