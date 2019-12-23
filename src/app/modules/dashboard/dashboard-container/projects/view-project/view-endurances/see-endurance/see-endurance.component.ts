import { Component,  Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-see-endurance",
  templateUrl: "./see-endurance.component.html",
  styleUrls: ["../../../../../../style.css"]
})
export class SeeEnduranceComponent {
  constructor(
    public dialogRef: MatDialogRef<SeeEnduranceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public onDismiss(): void {
    this.dialogRef.close(false);
  }
}
