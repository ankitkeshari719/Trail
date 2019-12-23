import { OnInit, Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/modules/auth/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-session-expire",
  templateUrl: "./session-expire.component.html",
  styleUrls: ["./session-expire.component.css"]
})
export class SessionExpireComponent implements OnInit {
  private userSub: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      if (!user) {
        //this.toastr.error("SESSION EXPIRE");
        this.router.navigate(["/session-expire"]);
      }
    });
  }

  backToLogin() {
    this.router.navigate([""], { relativeTo: this.route });
  }
}
