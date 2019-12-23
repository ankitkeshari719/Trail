import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-driversheets",
  templateUrl: "./view-driversheets.component.html",
  styleUrls: ["../../../../../style.css"]
})
export class ViewDriversheetsComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  createDriversheet() {
    this.router.navigate(["../create-driver-sheets"], {
      relativeTo: this.route
    });
  }
}
