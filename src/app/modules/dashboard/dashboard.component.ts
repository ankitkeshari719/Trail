import { AuthService } from './../auth/auth.service';
import { OnInit, Component, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["../style.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      if (!user) {
        this.router.navigate(["/auth"]);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
