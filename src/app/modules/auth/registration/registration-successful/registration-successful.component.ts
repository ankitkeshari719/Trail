import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from '../../auth.service';

@Component({
  selector: "app-registration-successful",
  templateUrl: "./registration-successful.component.html",
  styleUrls: ["../../auth.module.style.css"]
})
export class RegistrationSuccessfulComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      if (user) {
        this.router.navigate(["/dashboard"]);
      }
    });
  }

  backToLogin() {
    this.router.navigate([""], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
