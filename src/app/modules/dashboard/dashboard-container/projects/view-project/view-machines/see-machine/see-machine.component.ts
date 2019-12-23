import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-see-machine",
  templateUrl: "./see-machine.component.html",
  styleUrls: ["../../../../../../style.css"]
})
export class SeeMachineComponent {
  constructor(
    public dialogRef: MatDialogRef<SeeMachineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public onDismiss(): void {
    this.dialogRef.close(false);
  }
}
