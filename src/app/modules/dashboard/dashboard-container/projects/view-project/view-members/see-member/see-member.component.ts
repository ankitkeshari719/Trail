import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "app-see-member",
  templateUrl: "./see-member.component.html",
  styleUrls: ["../../../../../../style.css"]
})
export class SeeMemberComponent {
  constructor(
    public dialogRef: MatDialogRef<SeeMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public onDismiss(): void {
    this.dialogRef.close(false);
  }
}
