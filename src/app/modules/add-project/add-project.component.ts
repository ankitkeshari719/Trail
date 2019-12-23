import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormArray
} from "@angular/forms";
import { DashboardService } from "../dashboard/dashboard.service";
import { PlantService } from "../plant";
import { PlatformService } from "../platform";
import { MachineService } from "../machine/machine.service";
import { ToastrService } from "ngx-toastr";
import {
  Machine,
  User,
  EnduranceCycle,
  CommonList,
  InternalResponse,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { BehaviorSubject } from "rxjs";
import { SelectionModel } from "@angular/cdk/collections";
import {
  GET_USER_LIST,
  GET_USER_ROLES,
  GET_ACTIVITY_LIST
} from "src/app/config/backend.api.urls";
import { HttpErrorResponse } from "@angular/common/http";
import * as moment from "moment";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["../style.css"]
})
export class AddProjectComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private plantService: PlantService,
    private platformService: PlatformService,
    private machineService: MachineService,
    private toastr: ToastrService
  ) {}

  // Creating Form
  formGroup: FormGroup;

  ngOnInit() {
    this.dashboardService.setTitle("Add New Project");
    this.createForm();
    this.machineData.forEach((d: Machine) => this.addMachines(d, false));
    this.userData.forEach((d: User) => this.addUser(d, false));
    this.enduranceData.forEach((d: EnduranceCycle) =>
      this.addEnduranceCycle(d, false)
    );
    this.updateMachineTable();
    this.updateUserTable();
    this.updateEnduranceCycle();
    this.getRoleList();
    this.getActivityList();
    this.getModelList();
    this.getPlantList();
    this.getPlatformNameList();
    this.getUserList();
  }

  createForm() {
    this.formGroup = this._formBuilder.group({
      stepperData: this._formBuilder.array([
        this._formBuilder.group({
          type: null,
          startDate: null,
          endDate: null,
          projectName: null,
          description: null
        }),
        this._formBuilder.group({
          machines: this._formBuilder.array([])
        }),
        this._formBuilder.group({
          users: this._formBuilder.array([])
        }),
        this._formBuilder.group({
          enduranceCycles: this._formBuilder.array([])
        })
      ])
    });
  }

  /** Returns a stepperData with the name 'stepperData'. */
  get stepperData(): AbstractControl | null {
    return this.formGroup.get("stepperData");
  }

  //------------------------------  Step 1: Add Project ------------------------------
  add_project_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  projectTypes: CommonList[] = [
    { id: "101", name: "NPIP" },
    { id: "102", name: "EI" }
  ];

  //------------------------------  Step 2: Add Machine ------------------------------
  machineDataSource = new BehaviorSubject<AbstractControl[]>([]);
  machineSelection = new SelectionModel<Machine>(true, []);
  plantList: CommonList[];
  platformList: CommonList[];
  modelList: CommonList[];
  machineColumns = [
    "select",
    "plant",
    "platform",
    "model",
    "vin",
    "hours",
    "buttons"
  ];

  machineData: Machine[] = [
    {
      plantId: "",
      platformId: "",
      modelId: "",
      vin: "",
      targetHours: ""
    }
  ];

  get machines() {
    return this.formGroup
      .get("stepperData")
      .get([1])
      .get("machines") as FormArray;
  }

  addMachines(d?: Machine, noUpdate?: boolean) {
    this.machines.push(
      this._formBuilder.group({
        plantId: [d && d.plantId ? d.plantId : "", []],
        platformId: [d && d.platformId ? d.platformId : "", []],
        modelId: [d && d.modelId ? d.modelId : null, []],
        vin: [d && d.vin ? d.vin : null, []],
        targetHours: [d && d.targetHours ? d.targetHours : null, []],
        button: null
      })
    );
    if (!noUpdate) {
      this.updateMachineTable();
    }
  }

  updateMachineTable() {
    this.machineDataSource.next(this.machines.controls);
  }

  isAllMachineSelected() {
    const numSelected = this.machineSelection.selected.length;
    const numRows = this.machineDataSource.value.length;
    return numSelected === numRows;
  }

  masterMachineToggle() {
    this.isAllMachineSelected()
      ? this.machineSelection.clear()
      : this.machineDataSource.value.forEach(row => {
          return this.machineSelection.select(row.value);
        });
  }

  //------------------------------  Step 3: Add User ------------------------------
  userDataSource = new BehaviorSubject<AbstractControl[]>([]);
  userSelection = new SelectionModel<User>(true, []);
  roleList: CommonList[];
  userlist: CommonList[];
  userColumns = ["select", "plant", "role", "user", "phone", "buttons"];

  // Manual data (need to changes)
  userData: User[] = [
    { plantId: "", roleId: "", userId: "", mobileNumber: "" }
  ];

  getUserList() {
    this.dashboardService.getDashboardData(GET_USER_LIST).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.userlist = response.success_data.users;
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

  get users() {
    return this.formGroup
      .get("stepperData")
      .get([2])
      .get("users") as FormArray;
  }

  addUser(d?: User, noUpdate?: boolean) {
    this.users.push(
      this._formBuilder.group({
        plantId: [d && d.plantId ? d.plantId : "", []],
        roleId: [d && d.roleId ? d.roleId : "", []],
        userId: [d && d.userId ? d.userId : "", []],
        mobileNumber: [d && d.mobileNumber ? d.mobileNumber : "", []],
        button: null
      })
    );
    if (!noUpdate) {
      this.updateUserTable();
    }
  }

  updateUserTable() {
    this.userDataSource.next(this.users.controls);
  }

  isAllUserSelected() {
    const numSelected = this.userSelection.selected.length;
    const numRows = this.userDataSource.value.length;
    return numSelected === numRows;
  }

  masterUserToggle() {
    this.isAllUserSelected()
      ? this.userSelection.clear()
      : this.userDataSource.value.forEach(row =>
          this.userSelection.select(row.value)
        );
  }

  //------------------------------  Step 4: Add Endurance Cycle ------------------------------
  enduranceCycleDataSource = new BehaviorSubject<AbstractControl[]>([]);
  enduranceCycleSelection = new SelectionModel<EnduranceCycle>(true, []);
  activityList: CommonList[];
  enduranceCycleColumns = [
    "select",
    "activity",
    "instructions",
    "hours",
    "buttons"
  ];

  enduranceData: EnduranceCycle[] = [
    {
      activityId: "",
      instructions: "",
      hours: ""
    }
  ];

  get enduranceCycles() {
    return this.formGroup
      .get("stepperData")
      .get([3])
      .get("enduranceCycles") as FormArray;
  }

  addEnduranceCycle(d?: EnduranceCycle, noUpdate?: boolean) {
    this.enduranceCycles.push(
      this._formBuilder.group({
        activityId: [d && d.activityId ? d.activityId : "", []],
        instructions: [d && d.instructions ? d.instructions : "", []],
        hours: [d && d.hours ? d.hours : null, []],
        button: null
      })
    );
    if (!noUpdate) {
      this.updateEnduranceCycle();
    }
  }

  updateEnduranceCycle() {
    this.enduranceCycleDataSource.next(this.enduranceCycles.controls);
  }

  isEnduranceCycleSelected() {
    const numSelected = this.enduranceCycleSelection.selected.length;
    const numRows = this.enduranceCycleDataSource.value.length;
    return numSelected === numRows;
  }

  enduranceCycleMasterToggle() {
    this.isEnduranceCycleSelected()
      ? this.enduranceCycleSelection.clear()
      : this.enduranceCycleDataSource.value.forEach(row =>
          this.enduranceCycleSelection.select(row.value)
        );
  }

  // Step 5: Review
  reviewMachinesColumn = ["plant", "platform", "model", "vin", "hours"];
  reviewUsersColumn = ["plant", "role", "user", "phone"];
  reviewEnduranceCycleColumn = ["activity", "instructions", "hours"];

  reviewData;
  reviewMachine;
  reviewUser;
  reviewEndurance;
  getReviewData(data) {
    this.reviewData = this.getProjectsubmittedData(data);

    this.reviewMachine = this.reviewData.machine.map(mac => {
      let model = this.modelList.filter(e => e.id === mac.modelId);
      let plant = this.plantList.filter(e => e.id === mac.plantId);
      let platform = this.platformList.filter(e => e.id === mac.platformId);
      return {
        hours: mac.hours,
        modelName: model[0].name,
        plantName: plant[0].name,
        platformName: platform[0].name,
        vin: mac.vin
      };
    });

    this.reviewUser = this.reviewData.users.map(mac => {
      let role = this.roleList.filter(e => e.id === mac.roleId);
      let plant = this.plantList.filter(e => e.id === mac.plantId);
      let user = this.userlist.filter(e => e.id === mac.userId);
      return {
        mobileNumber: mac.mobileNumber,
        roleName: role[0].name,
        plantName: plant[0].name,
        userName: user[0].name
      };
    });

    this.reviewEndurance = this.reviewData.endurance.map(mac => {
      let activity = this.activityList.filter(e => e.id === mac.activityId);
      return {
        instruction: mac.instruction,
        hours: mac.hours,
        activityName: activity[0].name
      };
    });

    console.log(this.reviewMachine);
    console.log(this.reviewUser);
    console.log(this.reviewEndurance);
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
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
  }

  /**
   * Gets platform name list
   */
  getPlatformNameList() {
    this.platformService.getPlatformList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.platformList = response.success_data.platforms;
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
   * Gets model list
   */
  getModelList() {
    this.machineService.getModelList().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.modelList = response.success_data.models;
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
   * Gets role list
   */
  getRoleList() {
    this.dashboardService.getDashboardData(GET_USER_ROLES).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.roleList = response.success_data.roles;
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
   * Gets activity list
   */
  getActivityList() {
    this.dashboardService.getDashboardData(GET_ACTIVITY_LIST).subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.activityList = response.success_data.activities;
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

  // In Progress
  addProject(data) {
    let newProjectData = this.getProjectsubmittedData(data);
    this.dashboardService.addNewProject(newProjectData).subscribe(response => {
      console.log(response);
    });
  }

  getProjectsubmittedData(data) {
    let newProjectData = {
      description: data.stepperData[0].description,
      endDate: moment(data.stepperData[0].endDate).format("L"),
      startDate: moment(data.stepperData[0].startDate).format("L"),
      projectName: data.stepperData[0].projectName,
      type: data.stepperData[0].type,
      saveStatus: "FULL",
      machine: data.stepperData[1].machines.map(machine => {
        return {
          hours: machine.targetHours,
          modelId: machine.modelId,
          plantId: machine.plantId,
          platformId: machine.platformId,
          vin: machine.vin
        };
      }),
      users: data.stepperData[2].users.map(user => {
        return {
          mobileNumber: user.mobileNumber,
          plantId: user.plantId,
          roleId: user.roleId,
          userId: user.userId
        };
      }),
      endurance: data.stepperData[3].enduranceCycles.map(endurance => {
        return {
          activityId: endurance.activityId,
          hours: endurance.hours,
          instruction: endurance.instructions
        };
      })
    };
    return newProjectData;
  }
}
