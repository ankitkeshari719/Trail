import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { PojectEnduranceCycle, InternalResponse } from 'src/app/services';
import { handleResponse } from 'src/app/config/helper.function';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-edit-endurance",
  templateUrl: "./edit-endurance.component.html",
  styleUrls: ["../../../../../../style.css"]
})
export class EditEnduranceComponent implements OnInit {
  isLoading: boolean = false;
  userForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditEnduranceComponent>,
    private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      enduranceCycleName: [
        { value: this.data.enduranceCycleName, disabled: true },
        ,
        Validators.required
      ],
      instruction: ["", Validators.required],
      efforts: ["", Validators.required],
      unit: ["", Validators.required]
    });
    this.patchFormValue();
  }

  patchFormValue() {
    this.userForm.setValue({
      enduranceCycleName: this.data.enduranceCycleName,
      instruction: this.data.instruction,
      unit: this.data.unit,
      efforts: this.data.efforts
    });
    this.isLoading = false;
  }

  editProjectEndurance(
    updatedUserData: PojectEnduranceCycle,
    formDirective: FormGroupDirective
  ) {
    this.isLoading = true;
    updatedUserData.projectEnduranceCycleId = this.data.projectEnduranceCycleId;
    updatedUserData.enduranceCycleId = this.data.enduranceCycleId;
    updatedUserData.enduranceCycleName = this.data.enduranceCycleName;
    updatedUserData.hours = updatedUserData.unit;
    this.dashboardService.editProjectEndurance(updatedUserData).subscribe(
      response => {
        let responseData: InternalResponse = response;
        handleResponse(responseData, this.toastr);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        console.log(err.message);
      }
    );
    this.userForm.reset();
    formDirective.resetForm();
  }

  getEnduranceCycleNameError() {
    return this.userForm.get("enduranceCycleName").hasError("required")
      ? "Endurance Cycle Name is required"
      : "";
  }

  getInstructionError() {
    return this.userForm.get("instruction").hasError("required")
      ? "Instruction is required"
      : "";
  }

  getEffortsError() {
    return this.userForm.get("efforts").hasError("required")
      ? "Efforts is required"
      : "";
  }

  getUnitError() {
    return this.userForm.get("unit").hasError("required")
      ? "Unit is required"
      : "";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
