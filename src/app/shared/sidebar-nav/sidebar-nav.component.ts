import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { MediaMatcher } from "@angular/cdk/layout";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "src/app/modules/auth/auth.service";
import {
  InternalResponse,
  NavItem,
  INTERNAL_RESPONSE_STATUS
} from "src/app/services";
import { handleResponse } from "src/app/config/helper.function";
import { user_image } from "src/app/config/const";

@Component({
  selector: "app-sidebar-nav",
  templateUrl: "./sidebar-nav.component.html",
  styleUrls: ["./sidebar-nav.component.css"]
})
export class SidebarNavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  imageUrl = user_image;
  fillerNav = [
    {
      icon: "../../../assets/images/miu.svg",
      route: "/dashboard",
      tooltip: "Dashboard"
    },
    {
      icon: "../../../assets/images/dashboard_1.svg",
      route: "/add-project",
      tooltip: "Add Project"
    },
    {
      icon: "../../../assets/images/Question.svg",
      route: "/question",
      tooltip: "Question"
    },
    {
      icon: "../../../assets/images/user_Management.svg",
      route: "/update-user",
      tooltip: "Update User"
    },
    {
      icon: "../../../assets/images/Settings.svg",
      route: "/graph",
      tooltip: "Graph"
    }
  ];
  // navItems: NavItem[] = [
  //   {
  //     displayName: "Dashboard",
  //     route: "/dashboard",
  //     iconName: "home",
  //     tooltip: "Dashboard"
  //   },
  //   {
  //     displayName: "Graph",
  //     route: "/graph",
  //     iconName: "graphic_eq",
  //     tooltip: "graph"
  //   },
  //   {
  //     displayName: "Project",
  //     route: "/project",
  //     iconName: "insert_drive_file",
  //     tooltip: "Project"
  //   },
  //   {
  //     displayName: "Add User",
  //     route: "/add-user",
  //     iconName: "person_add",
  //     tooltip: "New User Registration"
  //   },
  //   {
  //     displayName: "Add Operator",
  //     route: "/register-operator",
  //     iconName: "tag_faces",
  //     tooltip: "New Operator Registration"
  //   },
  //   {
  //     displayName: "Update Role",
  //     route: "/handle-roles",
  //     iconName: "verified_user",
  //     tooltip: "New Role Addition"
  //   },
  //   {
  //     displayName: "Update User Profile",
  //     route: "/update-user",
  //     iconName: "edit",
  //     tooltip: "Update User Profile"
  //   },
  //   {
  //     displayName: "Question Bank",
  //     iconName: "question_answer",
  //     tooltip: "Add Question Bank",
  //     children: [
  //       {
  //         displayName: "Add Question",
  //         iconName: "star_rate",
  //         route: "/question"
  //       },
  //       {
  //         displayName: "Add Question Category",
  //         iconName: "star_rate",
  //         route: "/question-category"
  //       }
  //     ]
  //   },
  //   {
  //     displayName: "Device",
  //     route: "/device",
  //     iconName: "devices",
  //     tooltip: "Device"
  //   },
  //   {
  //     displayName: "Plants",
  //     route: "/plants",
  //     iconName: "meeting_room",
  //     tooltip: "Plants"
  //   },
  //   {
  //     displayName: "Platform",
  //     route: "/platform",
  //     iconName: "perm_device_information",
  //     tooltip: "Platform"
  //   },
  //   {
  //     displayName: "Machine",
  //     route: "/machine",
  //     iconName: "directions_boat",
  //     tooltip: "Machine"
  //   },
  //   {
  //     displayName: "Add Driversheet Template ",
  //     route: "/driversheet",
  //     iconName: "description",
  //     tooltip: "Add Driversheet"
  //   }
  // ];
  private _mobileQueryListener: () => void;
  private userSub: Subscription;
  isAuthenticated: boolean = false;
  isLoading: boolean = false;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 700px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  logout() {
    this.isLoading = true;
    this.authService.logout().subscribe(
      response => {
        let responseData: InternalResponse = response;
        if (responseData.status === INTERNAL_RESPONSE_STATUS.SUCCESS) {
          this.isLoading = false;
          this.toastr.success(response.success_message);
          this.router.navigate(["/auth"]);
          localStorage.removeItem("userData");
        } else {
          this.isLoading = false;
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.userSub.unsubscribe();
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
    h.test(window.location.host)
  );

  backToLogin() {
    this.router.navigate([""], { relativeTo: this.route });
  }
}
