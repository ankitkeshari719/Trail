import { DashboardService } from "./../../modules/dashboard/dashboard.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/modules/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["../style.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: string;
  loginInUser: string;
  private userSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardService.title.subscribe(response => {
      this.title = response;
    });
    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.loginInUser = user.firstName.concat(" " + user.lastName);
      }
    });
  }

  backToDashboard() {
    this.router.navigate(["../dashboard"], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
